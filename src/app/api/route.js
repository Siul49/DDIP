import mongoose from 'mongoose';
import dbConnect from '../../lib/dbConnect';

export async function GET() {
    try {
        // 1. MongoDB 연결 (dbConnect()는 기본 연결을 수행)
        await dbConnect();

        // 2. ddip 데이터베이스로 전환
        const ddipDb = mongoose.connection.useDb('ddip');
        console.log('현재 연결된 DB:', ddipDb.databaseName); // "ddip" 출력 확인

        // 3. object 컬렉션에서 데이터 조회 (Raw 쿼리)
        const data = await ddipDb.collection('object').find({}).toArray();
        console.log('Raw 쿼리 결과:', data);

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
