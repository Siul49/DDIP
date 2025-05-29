// pages/api/
//
//
// signup-api.js
import clientPromise from '../../util/database';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            userid,
            userpw,
            checkpw,
            username,
            name,
            phone,
            address,
            email,
        } = req.body;

        // 1. 기본 유효성 검사
        if (
            !userid ||
            !userpw ||
            !checkpw ||
            !username ||
            !name ||
            !phone ||
            !address ||
            !email
        ) {
            return res.status(400).json({ success: false, message: '모든 항목을 입력해주세요.' });
        }
        if (userpw !== checkpw) {
            return res.status(400).json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
        }

        // 2. DB 연결
        const client = await clientPromise;
        const db = client.db(); // 기본 DB 사용

        // 3. 아이디 또는 이메일 중복 체크
        const existing = await db.collection('users').findOne({
            $or: [{ userid }, { email }]
        });
        if (existing) {
            return res.status(409).json({ success: false, message: '이미 사용중인 아이디 또는 이메일입니다.' });
        }

        // 4. 비밀번호 암호화
        const hashedPw = await bcrypt.hash(userpw, 10);

        // 5. DB에 저장
        await db.collection('users').insertOne({
            userid,
            password: hashedPw,
            username,
            name,
            phone,
            address,
            email,
            createdAt: new Date(),
        });

        // 6. 성공 응답
        return res.status(201).json({ success: true });
    } else {
        // POST가 아닌 경우
        res.status(405).json({ success: false, message: '허용되지 않은 요청입니다.' });
    }
}
