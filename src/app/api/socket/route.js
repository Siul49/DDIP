import { Server } from "socket.io";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const rooms = new Map(); // 방 정보 저장

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server, {
            path: "/api/socket.io",
            addTrailingSlash: false
        });

        io.use(async (socket, next) => {
            const session = await getServerSession(
                socket.request,
                { req: socket.request },
                authOptions  // NextAuth 설정 가져오기
            );

            if (!session) return next(new Error('인증 실패'));
            socket.user = session.user;
            next();
        });

        io.on("connection", (socket) => {
            console.log(`${socket.user.nickname} 연결됨`);

            // 방 입장 처리
            socket.on('join-room', ({ roomId, max }) => {
                const room = rooms.get(roomId) || { users: new Set(), max };

                if (room.users.size >= room.max) {
                    return socket.emit('error', '방 정원 초과');
                }

                room.users.add(socket.user.id);
                rooms.set(roomId, room);
                socket.join(roomId);
            });

            // 메시지 전송
            socket.on('send-message', ({ roomId, message }) => {
                io.to(roomId).emit('new-message', {
                    user: socket.user.nickname,
                    message
                });
            });

            // 연결 해제 시
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
