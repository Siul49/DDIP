// pages/api/chat/join.js
import { decrypt } from '../../../../lib/session'; // 세션 복호화 함수 임포트
import { getRoomParticipants } from '../../../../lib/getRoomParticipants';

export default async function handler(req, res) {
    try {
        // 1. 쿠키에서 세션 토큰 추출
        const cookies = req.headers.cookie;
        if (!cookies) {
            return res.status(401).json({ error: '로그인이 필요합니다' });
        }

        // 2. 쿠키 파싱 (예: 'session=암호화된값; other=...')
        const sessionCookie = cookies
            .split(';')
            .map(c => c.trim())
            .find(c => c.startsWith('session='));

        if (!sessionCookie) {
            return res.status(401).json({ error: '세션이 존재하지 않습니다' });
        }

        // 3. 세션 복호화
        const sessionToken = sessionCookie.split('=')[1];
        const session = await decrypt(sessionToken);

        // 4. 세션 유효성 검사
        if (!session || !session.user) {
            return res.status(401).json({ error: '유효하지 않은 세션' });
        }

        // 5. 기존 비즈니스 로직 수행
        const { roomId, maxParticipants } = req.body;
        const currentParticipants = await getRoomParticipants(roomId);

        if (currentParticipants >= maxParticipants) {
            return res.status(400).json({ error: '방이 가득 찼습니다' });
        }

        // 6. 응답 반환
        return res.status(200).json({
            success: true,
            user: {
                id: session.user.id,        // 세션 구조에 맞게 수정
                nickname: session.user.nickname
            }
        });

    } catch (error) {
        console.error('방 입장 처리 에러:', error);
        return res.status(500).json({ error: '서버 에러 발생' });
    }
}
