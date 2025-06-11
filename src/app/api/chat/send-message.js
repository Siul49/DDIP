// pages/api/chat/send-messages.js
import dbConnect from '../../../lib/dbConnect';
import Message from '../../../models/Message';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await dbConnect();
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json({ success: true });
    } catch (error) {
        console.error('메시지 저장 실패:', error);
        res.status(500).json({ error: '메시지 저장 실패' });
    }
}
