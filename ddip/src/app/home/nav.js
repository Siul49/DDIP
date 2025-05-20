import Image from 'next/image';

import {useEffect, useState} from "react";

export function Navs({onSelect}) {
    const [moving,setMoved] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const handleClick = (selected_index) => {
        setActiveIndex(selected_index);
        if (onSelect) onSelect(selected_index);
    };

    useEffect(() => {
        const scrolled = () => {
            setMoved(window.scrollY > 50);
        };
        window.addEventListener('scroll', scrolled);
        return () => window.removeEventListener('scroll', scrolled);
    }, []);

    return (
        <>
            <nav
                    className={`fixed top-0 left-0 right-0 z-50 bg-[#FFFCED] shadow-lg flex items-center justify-center hover:opacity-100
                    transition-all duration-300 ${moving ? 'h-12 opacity-0 hover:h-20' : 'h-20 opacity-100 hover:shadow-2xl'}`}
            >
                <button onClick={() => window.location.reload()}
                        className="absolute w-32 left-3 text-center text-green-500 rounded-2xl cursor-pointer">
                    <div className="w-32 h-12 left-3">
                        <Image src="/DDIP.png" fill alt="Home" className="object-contain"/>
                    </div>

                </button>

                <button
                    onClick={() => {
                        if (onSelect) onSelect('sign');  // 예: 'sign' 모드로 바꾸기
                    }}
                    className="absolute right-20 cursor-pointer text-black shadow-green-500"
                >
                    로그인/회원가입
                </button>

                <div
                    className="absolute w-12 h-12 right-5 bg-green-500 border-black border-4 rounded-full cursor-pointer"></div>
            </nav>
        </>
    )
}