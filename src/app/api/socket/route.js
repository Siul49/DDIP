import { Server } from "socket.io";
import { decrypt } from '../../../lib/session';

const rooms = new Map();

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    if (!res.socket.server.io) {
        const io = new Server(res.socket.server, {
            path: "/api/socket.io",
            addTrailingSlash: false,
        });

        io.use(async (socket, next) => {
            try {
                const cookie = socket.request.headers.cookie;
                if (!cookie) return next(new Error('인증 실패: 쿠키 없음'));

                const sessionCookie = cookie
                    .split(';')
                    .map(c => c.trim())
                    .find(c => c.startsWith('session='));
                if (!sessionCookie) return next(new Error('인증 실패: 세션 쿠키 없음'));

                const sessionToken = decodeURIComponent(sessionCookie.split('=')[1]);
                const session = await decrypt(sessionToken);

                if (!session || !session.user) return next(new Error('인증 실패: 세션 유효하지 않음'));

                socket.user = session.user;
                next();
            } catch (err) {
                console.error('Socket 인증 에러:', err);
                next(new Error('인증 실패'));
            }
        });

        io.on("connection", (socket) => {
            console.log(`${socket.user.nickname} 연결됨`);

            socket.on('join-room', ({ roomId, max }) => {
                const room = rooms.get(roomId) || { users: new Set(), max };

                if (room.users.size >= room.max) {
                    return socket.emit('error', '방 정원 초과');
                }

                room.users.add(socket.user.id);
                rooms.set(roomId, room);
                socket.join(roomId);
            });

            socket.on('send-message', ({ roomId, message }) => {
                io.to(roomId).emit('new-message', {
                    user: socket.user.nickname,
                    message
                });
            });

            socket.on('disconnect', () => {
                rooms.forEach((room, roomId) => {
                    if (room.users.has(socket.user.id)) {
                        room.users.delete(socket.user.id);
                        if (room.users.size === 0) {
                            rooms.delete(roomId);
                        }
                    }
                });
            });
        });

        res.socket.server.io = io;
    }
    res.end();
}