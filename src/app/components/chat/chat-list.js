import { useState } from "react";
import ChatMessage from "./chat-component";
import Chatting from "./chatting";

export default function ChatList() {
    const chatData = [
        {
            chatId: "1", //채팅에 고유번호를 부여해야하는 걸까요?
            name: "고구마 한박스", //상품명
            lastUser: '고구미',
            lastMessage: "고구마 10개 사고 싶습니다!",
            time: "13:45",
            profileImg: "/none" //해당 상품 1번째 사진으로
        },
        {
            chatId: "2",
            name: "감자 10kg",
            lastUser: '감자군',
            lastMessage: "언제 만날까요?",
            time: "12:20",
            profileImg: "/none" 
        }
    ];

    const [selectedChat, setSelectedChat] = useState(null);

    const handleCloseChat = () => {
        setSelectedChat(null);
    }

    return (<>
            <div className="fixed bottom-[20px] right-[80px] w-[350px] h-[550px] bg-white
                            rounded-[20px] border-[2px] border-[#FEB162] z-100 flex flex-col">
                {/* 상단 */}
                <div className="flex items-center h-[50px] px-[15px] border-b-[2px] border-[#FEB162] gap-[10px]">
                    <p className="text-[20px] font-semibold truncate">메세지</p>
                </div>

                {/* 채팅 목록 */}
                <div className={"flex-1 overflow-y-auto"}>
                    {chatData.map(chat => (
                        <ChatMessage
                            key={chat.chatId}
                            {...chat}
                            onClick={() => setSelectedChat(chat)}
                        />
                    ))}
                </div>
            </div>

            {/* 선택된 채팅창 모달 띄우기 */}
            {selectedChat && (
                <Chatting
                    chatId={selectedChat.chatId}
                    name={selectedChat.name}
                    profileImg={selectedChat.profileImg}
                    onClose={handleCloseChat}
                />
            )}
        </>
    );
}
