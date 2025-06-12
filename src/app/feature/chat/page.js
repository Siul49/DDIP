// components/ChatList.js

'use client'

import { useState } from "react";
import ChatMessage from "../../components/chat/chat-message";
import Chat from "../../components/chat/chat";

// 임의의 로그인 정보
const user = {
    id: "user123",
    nickname: "갱수"
};

// 임의의 채팅방 데이터
const chatData = [
    {
        chatId: "room1",
        name: "갱수님의 띱",
        lastUser: "홍길동",
        message: "안녕하세요!",
        time: "오후 2:00",
        profileImg: "/profile1.png"
    },
    {
        chatId: "room2",
        name: "Next.js 개발자",
        lastUser: "김철수",
        message: "13버전에서 바뀐 점 공유해요!",
        time: "오후 1:10",
        profileImg: "/profile2.png"
    }
];

export default function ChatList() {
    const [selectedChat, setSelectedChat] = useState(null);

    const handleCloseChat = () => {
        setSelectedChat(null);
    }

    return (
        <>
            <div className="fixed bottom-[20px] right-[80px] w-[350px] h-[550px] bg-white
                            rounded-[20px] border-[2px] border-[#FEB162] z-100 flex flex-col">
                {/* 상단 */}
                <div className="flex items-center h-[50px] px-[15px] border-b-[2px] border-[#FEB162] gap-[10px]">
                    <p className="text-[20px] font-semibold truncate">메세지</p>
                </div>
                {/* 채팅 목록 */}
                <div className="flex-1 overflow-y-auto">
                    {chatData.map(chat => (
                        <ChatMessage
                            key={chat.chatId}
                            name={chat.name}
                            lastUser={chat.lastUser}
                            lastMessage={chat.message}
                            time={chat.time}
                            profileImg={chat.profileImg}
                            onClick={() => setSelectedChat(chat)}
                        />
                    ))}
                </div>
            </div>
            {/* 선택된 채팅창 모달 띄우기 */}
            {selectedChat && (
                <Chat
                    onClose={handleCloseChat}
                    name={selectedChat.name}
                    roomId={selectedChat.chatId}
                    userId={user.id}
                    userNickname={user.nickname}
                />
            )}
        </>
    );
}
