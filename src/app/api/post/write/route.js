import dbConnect from '../../../../lib/dbConnect';
import Item from '../../../../models/item';

export async function POST(request) {
    try {
        await dbConnect();

        const contentType = request.headers.get('content-type') || '';
        let data;

        if (contentType.includes('application/json')) {
            data = await request.json();
        } else if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            data = Object.fromEntries(formData.entries());

            // 이미지 파일을 Base64 문자열로 변환
            if (formData.has('image')) {
                const file = formData.get('image');
                if (file && typeof file.arrayBuffer === 'function') {
                    const arrayBuffer = await file.arrayBuffer();
                    const base64String = Buffer.from(arrayBuffer).toString('base64');
                    // MIME 타입 추출
                    const mimeType = file.type || 'image/png';
                    // data:image/png;base64,xxxxxx 형태로 저장
                    data.image = `data:${mimeType};base64,${base64String}`;
                }
            }
        } else {
            return new Response(
                JSON.stringify({ success: false, message: '지원하지 않는 Content-Type' }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // 필수 필드 검증
        const requiredFields = [
            'title',
            'description',
            'writer',
            'itemCategory',
            'totalNumberOfRecruits',
            'totalPrice',
            'pricePerEachPerson',
            'tradeType',
        ];

        const missingFields = requiredFields.filter(field => !data[field]);
        if (missingFields.length > 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: `필수 입력값 누락: ${missingFields.join(', ')}`
                }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // 숫자 필드 변환
        const numberFields = [
            'totalPrice',
            'totalNumberOfRecruits',
            'pricePerEachPerson',
            'numberOfRecruitedPersonnel'
        ];
        numberFields.forEach(field => {
            if (data[field]) data[field] = Number(data[field]);
        });

        // 이미지 Base64 문자열 처리 (크기 및 타입 체크)
        if (data.image) {
            // Base64 크기 계산 (실제 파일 크기와 다를 수 있음)
            const base64Length = data.image.length;
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (base64Length > maxSize) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        message: '이미지 크기는 5MB를 초과할 수 없습니다.'
                    }),
                    { status: 400, headers: { "Content-Type": "application/json" } }
                );
            }

            // MIME 타입 유효성 검사
            const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (data.image.startsWith('data:image')) {
                const mimeType = data.image.split(';')[0].split(':')[1];
                if (!validMimeTypes.includes(mimeType)) {
                    return new Response(
                        JSON.stringify({
                            success: false,
                            message: 'JPEG, PNG, GIF 형식만 지원합니다.'
                        }),
                        { status: 400, headers: { "Content-Type": "application/json" } }
                    );
                }
            }
        }

        const newItem = await Item.create(data);
        return new Response(
            JSON.stringify({ success: true, item: newItem }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error('서버 에러:', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: error.message || '서버 처리 중 오류 발생'
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
