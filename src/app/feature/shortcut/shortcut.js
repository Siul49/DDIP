import Image from 'next/image';
import ChatBox from '@components/chat/chatting';
import PostBox from '@components/post/post-box';

import {useEffect, useState} from "react";

export default function Shortcut({}) {
    const [isCOpen, setIsCOpen] = useState(false);
    const [isPOpen, setIsPOpen] = useState(false);

    const [user, setUser] = useState(null);
    useEffect(() => {
        fetch('/api/auth/check')
            .then(res => res.json())
            .then(data => setUser(data.user))
    }, [])

    const toggleChat = () => setIsCOpen(!isCOpen);
    const togglePost = () => setIsPOpen(!isPOpen);

    return (
        <>
        {user ? (
                <>
                    <button
                        className="fixed bottom-5 right-5 p-7 bg-[#FEB162] text-white rounded-full transition z-50
                hover:bg-[#DE9142]"
                        onClick={toggleChat}
                    ><Image src="/message_button.png" fill alt="chat" className="object-contain p-2"/>
                    </button>
                    {isCOpen && <ChatBox onClose={toggleChat} />}

                    <button
                        className="fixed bottom-21 right-5 p-6 bg-[#FADD88] text-white rounded-full transition z-50
                hover:bg-[#DABD78]"
                        onClick={togglePost}
                    >
                        <Image src="/post-button.png" fill alt="write" className="object-contain p-2"/>
                    </button>
                    {isPOpen && <PostBox onClose={togglePost} />}
                </>
            ) : (
                <>
                    <button
                        className="fixed bottom-5 right-5 p-6 bg-[#FEB162] text-white rounded-full transition z-50
                hover:bg-[#DE9142]" onClick={() => alert('로그인을 해야 사용할 수 있는 기능입니다')}>
                        <Image src="/chat.png" fill alt="chat" className="object-contain p-2"/>
                    </button>

                    <button
                        className="fixed bottom-21 right-5 p-7 bg-[#FADD88] text-white rounded-full transition z-50
                hover:bg-[#DABD78]"
                    >
                        <Image src="/post_button.png" fill alt="write" className="object-contain p-2" onClick={() => alert('로그인을 해야 사용할 수 있는 기능입니다')}/>
                    </button>
                </>
            )
        }
    </>

    )
}