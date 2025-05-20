'use client';

import SignupForm from './component/SignupForm';
import { Navs } from '../home/nav';
import Image from 'next/image';
import LoginForm from "./component/LoginForm";
import {useState} from "react";

export default function SignUp() {
    const [isLogin, setIsLogin] = useState(false);

    return (<>
        <div className="w-full h-full flex flex-col items-center bg-[#FFFEF]">
            <Navs />
            <div className="flex justify-center mt-[100px]">
                <Image
                    src="/DDIP.png"
                    alt="log"
                    width={isLogin ? 600 : 200}
                    height={isLogin ? 300 : 100}/>
            </div>
            <div className="flex flex-col item-center w-[660px] h-full mt-[30px] mb-[100px]
            rounded-[30px] opacity-70 bg-[#FFFEF6] shadow-[0px_0px_40px_0px_#D9D9D9]">
                {isLogin ? (<LoginForm />) : (<SignupForm setIsLogin={setIsLogin} />)}
            </div>
        </div>
        </>
    );
}