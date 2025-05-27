// pages/chat.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const Chat = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // 서버와 소켓 연결
        socket = io({
            path: '/api/socket_io',
        });

        socket.on('message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (username && message) {
            socket.emit('message', {
                user: username,
                text: message,
                timestamp: new Date().toISOString(),
            });
            setMessage('');
        }
    };

    return (
        <div>
            <h1>실시간 채팅</h1>
            <div>
                {messages.map((msg, idx) => (
                    <div key={idx}>
                        <strong>{msg.user}</strong> ({new Date(msg.timestamp).toLocaleTimeString()}): {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="사용자 이름"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="text"
                placeholder="메시지"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>전송</button>
        </div>
    );
};

export default Chat;
