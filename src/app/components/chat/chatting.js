// chatting.js
import {useState, useEffect, useRef} from "react";
import Image from "next/image";

export default function Chatting({chatId, name, profileImg, onClose}) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);  //스크롤 위치 제일 아래로

    //리엑트에서 컴포넌트가 화면에 처음 나타나는 순간(컴포넌트 마운트)에 로컬스토리지에서 불러오기
    useEffect(() => {
        const stored = localStorage.getItem(`chatMessages-${chatId}`);
        if (stored) setMessages(JSON.parse(stored));
        }, [chatId]);

    //메세지 보내기
    const handleSend = () => {
        if (input.trim() === "") return;

        //본인 (보내는 사람) -> 로그인&회원가입에서 받은 정보를 바탕으로 수정
        const newMessage = {
            id: Date.now(),
            text: input,
            sender: "me",
            name: "나",  //별명
            time: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
        };

        const updatedMessages = [...messages, newMessage];

        //예시 메세지 (보낸 사람) -> 로그인&회원가입에서 받은 정보를 바탕으로 수정
        const autoReply = {
            id: Date.now() + 1,
            text: "고구마 10개 사고 싶습니다!",
            sender: "other",  //상대 메세지
            name: "고구미",
            time: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
        };

        const finalMessages = [...messages, newMessage, autoReply];

        setMessages(finalMessages);
        localStorage.setItem(`chatMessages-${chatId}`, JSON.stringify(finalMessages));
        setInput("");
    };

    //messages가 변경될 때마다 스크롤을 밑으로 이동
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);


    return (
        <div className="fixed bottom-[20px] right-[80px] w-[350px] h-[550px] bg-white
                        rounded-[20px] border-[2px] border-[#FEB162] z-100 flex flex-col">
            {/* 상단 */}
            <div className="flex items-center h-[50px] px-[15px] border-b-[2px] border-[#FEB162] gap-[10px]">
                <button onClick={onClose} className="w-[30px] h-[30px] mr-4 bg-[#FEB162] text-white rounded-full font-bold cursor-pointer">
                    ←
                </button>
                <p className="text-[20px] font-semibold truncate">{name}</p>
            </div>

            {/* 채팅 부분 */}
            <div className="flex-1 overflow-y-auto p-3 h-64 custom-scrollbar">
                {messages.map((msg) => (
                    <div key={msg.id}
                         className={`mb-[15px] flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>

                        <div className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}>
                            {/* 이름 (상대방 메시지일 때만 표시) */}
                            {msg.sender !== "me" && (
                                <span className="text-[14px] font-semibold ml-[2px] text-black mb-1">
                                    {msg.name}
                                </span>
                            )}
                            {/* 말풍선 + 시간*/}
                            <div className={`flex items-end ${msg.sender === "me" ? "flex-row-reverse" : "flex-row"} gap-1`}>
                                {/* 말풍선 */}
                                <span className={`max-w-[250px] px-[10px] py-[8px] rounded-[12px] text-regular text-[14px] inline-block break-words
                                ${msg.sender === "me" ? "bg-[#FADD88]" : "bg-white border-[1px] border-[#D9D9D9]"}`}>
                                  {msg.text}
                                </span>
                                {/* 시간 */}
                                <span className={"text-[10px] text-[#D0D0D0] mb-[3px]"}>
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                {/* 스크롤 제일 밑에 위치한 빈 div */}
                <div ref={messagesEndRef}/>
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
                    className="w-[30px] h-[30px] relative rounded-full bg-[#FADD88] text-white font-bold cursor-pointer"
                >→
                    <span className="absolute w-[50%] border-5-[3px] border-t-black"></span>
                </button>
            </div>
        </div>
    );
}
