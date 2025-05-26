'use client';

import SignupForm from './component/SignupForm';
import Image from 'next/image';

export function Signup() {
    return (<>
        <div className="w-full h-full flex flex-col items-center bg-[#FFFEF]">
            <div className="flex justify-center mt-[100px]">
                <Image src="/DDIP.png" alt="log" width={200} height={100}/>
            </div>
            <div className="flex flex-col item-center w-[660px] h-full mt-[30px] mb-[100px]
            rounded-[30px] opacity-70 bg-[#FFFEF6] shadow-[0px_0px_40px_0px_#D9D9D9]">
                <p className="text-center font-[Pretendard Variable] text-[36px] font-bold leading-normal mt-[20px]">회원가입</p>
                <SignupForm />
            </div>
        </div>
        </>
    );
}