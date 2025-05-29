import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('ddip');             // ddip DB 선택
        const collection = db.collection('object');  // object 컬렉션 선택
        const data = await collection.find({}).toArray();

        return new Response(JSON.stringify(data), {
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
