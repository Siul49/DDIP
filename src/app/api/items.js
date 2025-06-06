// /pages/api/items.js

import dbConnect from '/lib/dbConnect';
import Item from '/models/Item'; // 아이템 스키마 모델 필요

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const items = await Item.find({});
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ error: '아이템 조회 실패' });
        }
    } else {
        res.status(405).json({ error: '허용되지 않은 요청입니다.' });
    }
}
