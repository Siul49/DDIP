// pages/api/socket.js
import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default function handler(req, res) {
    if (!res.socket.server.io) {
        const io = new SocketIOServer(res.socket.server, {
            path: '/api/socket_io',
        });
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            socket.on('message', (msg) => {
                io.emit('message', msg);
            });
        });
    }
    res.end();
}
