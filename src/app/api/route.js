import clientPromise from '/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('ddip');
        const collection = db.collection('object');
        const data = await collection.find({}).toArray();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('MongoDB ��ȸ ����:', error);
        return new Response(
            JSON.stringify({ message: '���� ���� �߻�' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
