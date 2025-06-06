import Image from 'next/image';
import ChatList from '../chat/chat-list';
import ChatBox from '../chat/chatting';
import PostBox from './post';

import {useEffect, useState} from "react";

export default function Shortcut({}) {
    const [isCOpen, setIsCOpen] = useState(false);
    const [isPOpen, setIsPOpen] = useState(false);


    const toggleChat = () => setIsCOpen(!isCOpen);
    const togglePost = () => setIsPOpen(!isPOpen);

    return (
        <>
            <button
                className="fixed bottom-5 right-5 p-6 bg-[#FEB162] text-white rounded-full transition z-50
                hover:bg-[#DE9142]"
                onClick={toggleChat}
            ><Image src="/chat.png" fill alt="chat" className="object-contain p-2"/>
            </button>
                {isCOpen && <ChatBox onClose={toggleChat} />}

            <button
                className="fixed bottom-20 right-5 p-6 bg-[#FADD88] text-white rounded-full transition z-50
                hover:bg-[#DABD78]"
                onClick={togglePost}
            >
                <Image src="/Write.png" fill alt="write" className="object-contain p-2"/>
            </button>
            {isPOpen && <PostBox onClose={togglePost} />}
        </>
    )
}