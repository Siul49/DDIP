'use client'

import SignupForm from './components/signup-form';
import LoginForm from "./components/login-form";
import { useState } from "react";
import NavClient from "@components/common/Nav.client";


export default function SignUp() {
    const [status, setStatus] = useState(false);

    return (
        <div className="relative w-full h-full flex flex-col items-center bg-[#FFFEF]">
            <NavClient />

            <div className="flex flex-col items-center w-[660px] h-full mt-[150px] mb-[100px]
                rounded-[30px] opacity-70 bg-[#FFFEF6] shadow-[0px_0px_40px_0px_#D9D9D9]">

                {status
                    ? <SignupForm setStatus={setStatus} />
                    : <LoginForm />
                }

                {/*
                비밀번호 찾기, 아이디 찾기 구현
                이메일로 코드 보내고 인증 같은 절차 구현
                */}

                <button
                    onClick={() => setStatus(!status)}
                    className="mb-3 text-blue-500 underline"
                >
                    {status ? '로그인으로 돌아가기' : '회원가입'}
                </button>
            </div>
        </div>
    );
}

