import Image from 'next/image';
import ChatList from '../chat/chat-list';
import Chatting from '../chat/chatting';
import {useEffect, useState} from "react";

export default function Shortcut({}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                className="fixed bottom-5 right-5 p-6 bg-[#FEB162] text-white rounded-full transition z-50
                hover:bg-[#DE9142]"
                onClick={toggleChat}
            ><Image src="/chat.png" fill alt="chat" className="object-contain p-2"/>
            </button>
            {isOpen && <ChatList onClose={toggleChat} />}

            <button
                className="fixed bottom-20 right-5 p-6 bg-[#FADD88] text-white rounded-full transition z-50
                hover:bg-[#DABD78]"
                onClick={() => alert('글쓰기')}
            >
                <Image src="/Write.png" fill alt="write" className="object-contain p-2"/>
            </button>
        </>
    )
}