// components/Chat.js
'use client'

import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

let socket;

export default function Chat({ onClose, name, roomId }) {
    const [chatLog, setChatLog] = useState([]);
    const [message, setMessage] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);

    // 소켓 연결 초기화
    useEffect(() => {
        const socketInitializer = async () => {
            await fetch('/api/socket');
            socket = io();

            socket.on('connect', () => {
                setIsConnected(true);
                socket.emit('join-room', { roomId });
            });

            socket.on('new-message', (msg) => {
                setChatLog(prev => [...prev, {
                    text: msg.message,
                    time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
                    sender: msg.user.id === socket.id ? "me" : "other",
                    name: msg.user.nickname
                }]);
            });

            socket.on('disconnect', () => setIsConnected(false));
        };

        socketInitializer();
        return () => socket?.disconnect();
    }, [roomId]);

    // 메시지 전송 핸들러
    const sendMessage = () => {
        if (message.trim() && isConnected) {
            socket.emit('send-message', {
                roomId,
                message: message.trim(),
                user: {
                    id: socket.id,
                    nickname: name
                }
            });
            setMessage("");
        }
    };

    // 스크롤 최하단으로 이동
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatLog]);

    return (
        <div className="fixed bottom-[20px] right-[80px] w-[350px] h-[550px] bg-white rounded-[20px] border-[2px] border-[#FEB162] z-100 flex flex-col">
            {/* 기존 JSX 구조 유지 */}
            <div className="flex items-center h-[50px] px-[15px] border-b-[2px] border-[#FEB162] gap-[10px]">
                <button onClick={onClose} className="w-[30px] h-[30px] mr-4 bg-[#FEB162] text-white rounded-full font-bold cursor-pointer">
                    ←
                </button>
                <p className="text-[20px] font-semibold truncate">{name}</p>
            </div>

            {/* 채팅 메시지 영역 */}
            <div className="flex-1 overflow-y-auto p-3 h-64 custom-scrollbar">
                {chatLog.map((msg, idx) => (
                    <div key={idx} className={`mb-[15px] flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}>
                            {msg.sender !== "me" && (
                                <span className="text-[14px] font-semibold ml-[2px] text-black mb-1">
                                    {msg.name}
                                </span>
                            )}
                            <div className={`flex items-end ${msg.sender === "me" ? "flex-row-reverse" : "flex-row"} gap-1`}>
                                <span className={`max-w-[250px] px-[10px] py-[8px] rounded-[12px] text-regular text-[14px] inline-block break-words
                                    ${msg.sender === "me" ? "bg-[#FADD88]" : "bg-white border-[1px] border-[#D9D9D9]"}`}>
                                    {msg.text}
                                </span>
                                <span className="text-[10px] text-[#D0D0D0] mb-[3px]">
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* 메시지 입력 영역 */}
            <div className="flex justify-center items-center w-[320px] h-[40px] mb-[10px] gap-2 p-[5px]
                          rounded-[20px] border-[1px] border-[#D9D0D0] self-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 px-2 text-sm focus:outline-none"
                    placeholder={isConnected ? "메시지를 입력하세요." : "연결 중..."}
                    disabled={!isConnected}
                />
                <button
                    onClick={sendMessage}
                    className={`w-[30px] h-[30px] relative rounded-full ${isConnected ? "bg-[#FADD88]" : "bg-gray-300"} text-white font-bold cursor-pointer`}
                    disabled={!isConnected}
                >
                    →
                </button>
            </div>
        </div>
    );
}
