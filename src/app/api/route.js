import dbConnect from '../../lib/mongodb';
import ObjectModel from '../../lib/object';



export async function GET() {
    try {
        await dbConnect();                     // mongoose 연결

        // 🔍 object 컬렉션에 있는 모든 데이터 조회
        const data = await ObjectModel.find({});

        // _id를 문자열로 변환해 직렬화
        const serialized = data.map(item => ({
            ...item.toObject(),
            _id: item._id.toString(),
        }));

        return new Response(JSON.stringify(serialized), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('MongoDB 조회 에러:', error);
        return new Response(
            JSON.stringify({ message: '서버 에러 발생' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
