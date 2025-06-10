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
            data = Object.fromEntries(formData.entries()); // 간결하게 변환
        } else {
            return new Response(
                JSON.stringify({ success: false, message: '지원하지 않는 Content-Type' }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // 필수 필드 검증
        const requiredFields = ['title', 'description', 'itemCategory', 'tradeType'];
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
        const numberFields = ['totalPrice', 'totalNumberOfRecruits', 'pricePerEachPerson'];
        numberFields.forEach(field => {
            if (data[field]) data[field] = Number(data[field]);
        });

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
