'use client'

import SignupForm from '@components/auth/signup-form';
import LoginForm from "@components/auth/login-form";
import { useState } from "react";
import Nav from "@components/common/nav";


export default function SignUp() {
    const [status, setStatus] = useState(false);

    return (
        <div className={`relative w-full flex flex-col items-center bg-[#FFFCED]
    ${status ? 'h-full mb-[1100px]' : 'h-200 mb-[0px]'}`}>
            <Nav/>

            <div className={`flex flex-col items-center w-[660px] mb-[110px]
    rounded-[30px] opacity-70 bg-[#FFFEF6] shadow-[0px_0px_40px_0px_#D9D9D9]
    ${status ? 'h-[1750px] mt-[290px]' : 'h-[470px] mt-[320px]'}`}>

                {status
                    ? <SignupForm setStatus={setStatus}/>
                    : <LoginForm/>
                }

                {/*
                비밀번호 찾기, 아이디 찾기 구현
                이메일로 코드 보내고 인증 같은 절차 구현
                */}

                <button
                    onClick={() => setStatus(!status)}
                    className="mb-30 text-blue-500 underline"                >
                    {status ? '로그인으로 돌아가기' : '회원가입'}
                </button>
            </div>
        </div>
    );
}

