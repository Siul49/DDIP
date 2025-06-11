// pages/api/chat/messages.js
import dbConnect from '../../../lib/dbConnect';
import Message from '../../../models/Message';

export default async function handler(req, res) {
    const { roomId } = req.query;

    try {
        await dbConnect();
        const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('메시지 조회 실패:', error);
        res.status(500).json({ error: '메시지 조회 실패' });
    }
}
