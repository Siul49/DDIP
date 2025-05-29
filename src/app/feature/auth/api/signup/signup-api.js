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

        // 1. �⺻ ��ȿ�� �˻�
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
            return res.status(400).json({ success: false, message: '��� �׸��� �Է����ּ���.' });
        }
        if (userpw !== checkpw) {
            return res.status(400).json({ success: false, message: '��й�ȣ�� ��ġ���� �ʽ��ϴ�.' });
        }

        // 2. DB ����
        const client = await clientPromise;
        const db = client.db(); // �⺻ DB ���

        // 3. ���̵� �Ǵ� �̸��� �ߺ� üũ
        const existing = await db.collection('users').findOne({
            $or: [{ userid }, { email }]
        });
        if (existing) {
            return res.status(409).json({ success: false, message: '�̹� ������� ���̵� �Ǵ� �̸����Դϴ�.' });
        }

        // 4. ��й�ȣ ��ȣȭ
        const hashedPw = await bcrypt.hash(userpw, 10);

        // 5. DB�� ����
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

        // 6. ���� ����
        return res.status(201).json({ success: true });
    } else {
        // POST�� �ƴ� ���
        res.status(405).json({ success: false, message: '������ ���� ��û�Դϴ�.' });
    }
}
