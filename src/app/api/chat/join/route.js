import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ error: '로그인이 필요합니다' });
    }

    const { roomId, maxParticipants } = req.body;

    // 방 최대 인원 체크 로직 (예시)
    const currentParticipants = await getRoomParticipants(roomId); // DB에서 현재 인원 조회
    if (currentParticipants >= maxParticipants) {
        return res.status(400).json({ error: '방이 가득 찼습니다' });
    }

    // 여기에 방 입장 처리 로직 추가
    return res.status(200).json({
        success: true,
        user: session.user
    });
}
