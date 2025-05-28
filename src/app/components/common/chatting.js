// chatting.js
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ChatBox({ onClose }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);  //스크롤 위치 제일 아래로

    //메세지 저장
    const handleSend = () => {
        if (input.trim() === "") return;
        setMessages([...messages, { id: Date.now(), text: input }]);
        setInput("");
    };

    //messages가 변경될 때마다 스크롤을 밑으로 이동
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);


    return (
        <div className="fixed bottom-[20px] right-[80px] w-[350px] h-[500px] bg-white
                        rounded-[20px] border-[2px] border-[#FEB162] z-100 flex flex-col">
            {/* 상단 */}
            <div className="flex items-center h-[50px] px-[15px] border-b-[2px] border-[#FEB162] gap-[10px]">
                <button onClick={onClose} className="w-[20px] h-[20px] relative">
                    <Image src="/chat-back.svg" fill alt="chat-back" />
                </button>
                {/*채팅명으로 바뀌어야해서 나중에 데이터 불러와야합니당*/}
                <p className="text-[20px] font-semibold truncate">채팅</p>
            </div>

            {/* 채팅 부분 */}
            <div className="flex-1 overflow-y-auto p-3 h-64 custom-scrollbar">
                {messages.map((msg) => (
                    <div key={msg.id} className="mb-2 flex justify-end">
                        <span className="max-w-[250px] bg-[#FADD88] px-[10px] py-[8px]
                                        rounded-[10px] text-sm inline-block">
                          {msg.text}
                        </span>
                    </div>
                ))}
                {/* 스크롤 제일 밑에 위치한 빈 div */}
                <div ref={messagesEndRef} />
            </div>

            {/* 입력 부분 */}
            <div className="flex justify-center items-center w-[320px] h-[40px] mb-[10px] gap-2 p-[5px]
                            rounded-[20px] border-[1px] border-[#D9D9D9] self-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 px-2 text-sm focus:outline-none"
                    placeholder="메시지를 입력하세요."
                />
                <button
                    onClick={handleSend}
                    className="w-[30px] h-[30px] relative"
                ><Image src="/chat-send.svg" fill alt="chat-send" />
                </button>
            </div>
        </div>
    );
}
