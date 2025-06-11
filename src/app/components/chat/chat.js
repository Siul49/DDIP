// components/Chat.js
'use client'

import { useEffect, useState, useRef } from "react";

export default function Chat({ onClose, name, roomId, userId, userNickname }) {
    const [chatLog, setChatLog] = useState([
        {
            name: "트럼프",
            text: "안녕하세요!",
            time: "오후 2:00",
            sender: "other"
        },
        {
            name: "나",
            text: "안녕하세요! 반가워요~",
            time: "오후 2:01",
            sender: "me"
        }
    ]);
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatLog]);

    const sendMessage = () => {
        if (!message.trim()) return;
        const now = new Date();
        setChatLog(prev => [
            ...prev,
            {
                name: userNickname,
                text: message,
                time: now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
                sender: "me"
            }
        ]);
        setMessage("");
    };

    return (
        <div className="fixed bottom-[20px] right-[80px] w-[350px] h-[550px] bg-white rounded-[20px] border-[2px] border-[#FEB162] z-100 flex flex-col">
            {/* 상단 헤더 */}
            <div className="flex items-center h-[50px] px-[15px] border-b-[2px] border-[#FEB162] gap-[10px]">
                <button
                    onClick={onClose}
                    className="w-[30px] h-[30px] mr-4 bg-[#FEB162] text-white rounded-full font-bold cursor-pointer"
                >
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
                    placeholder="메시지를 입력하세요."
                />
                <button
                    onClick={sendMessage}
                    className="w-[30px] h-[30px] relative rounded-full bg-[#FADD88] text-white font-bold cursor-pointer"
                >
                    →
                </button>
            </div>
        </div>
    );
}
