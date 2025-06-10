// app/components/nav (클라이언트 컴포넌트)
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import LogoutButton from "@auth/components/logout-button";

export default function Nav() {
    const [user, setUser] = useState(null)
    const [moving, setMoved] = useState(false)

    // 1. 로그인 정보 가져오기
    useEffect(() => {
        fetch('/api/auth/check')
            .then(res => res.json())
            .then(data => setUser(data.user))
    }, [])

    useEffect(() => {
        const scrolled = () => setMoved(window.scrollY > 50)
        window.addEventListener('scroll', scrolled)
        return () => window.removeEventListener('scroll', scrolled)
    }, [])

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 bg-[#FFFCED] shadow-lg flex items-center justify-center hover:opacity-100
        transition-all duration-300 ${moving ? 'h-12 opacity-0 hover:h-20' : 'h-16 opacity-100 hover:shadow-2xl'}`}
        >
            <Link href="/public" className="absolute w-32 left-3 text-center text-green-500 rounded-2xl cursor-pointer">
                <div className="w-32 h-9 left-3">
                    <Image src="/DDIP_yellow.png" fill alt="Home" className="object-contain" />
                </div>
            </Link>

            {user ? (
                <><span className="absolute right-40 text-black">
                    안녕하세요, {user.nickname}님
                </span>
                    <span className="absolute right-22 text-black">
                    <LogoutButton />
                </span>
                </>

            ) : (
                <Link href="/feature/auth" className="absolute right-20 cursor-pointer text-black shadow-green-500">
                    로그인 / 회원가입
                </Link>
            )}

            <div className="absolute w-10 h-10 right-5 bg-lime-300 rounded-full cursor-pointer"></div>
        </nav>
    )
}
