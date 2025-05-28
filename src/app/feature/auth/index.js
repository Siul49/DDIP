// 'use client';
//
// import SignupForm from './components/signup-form.js';
// import LoginForm from './components/login-form.js';
// import Image from 'next/image';
//
// /*
// import { connectDB } from "../util/database";
//
// export async function getServerSideProps() {
//   const db = (await connectDB).db("forum");
//   const posts = await db.collection("post").find().toArray();
//   return {
//     props: { posts: JSON.parse(JSON.stringify(posts)) },
//   };
// }
// */
//
// export function Signup() {
//     return (<>
//             <div className="w-full h-full flex flex-col items-center bg-[#FFFEF]">
//                 <div className="flex justify-center mt-[100px]">
//                     <Image src="/DDIP.png" alt="log" width={200} height={100}/>
//                 </div>
//                 <div className="flex flex-col item-center w-[660px] h-full mt-[30px] mb-[100px]
//             rounded-[30px] opacity-70 bg-[#FFFEF6] shadow-[0px_0px_40px_0px_#D9D9D9]">
//                     <LoginForm />
//                     <button className="text-center font-[Pretendard Variable] text-[36px] font-bold leading-normal mt-[20px]">회원가입</button>
//                     <SignupForm />
//                 </div>
//             </div>
//         </>
//     );
// }

'use client';

import SignupForm from './components/signup-form';
import Navs from '@components/common/nav.js';
import Image from 'next/image';
import LoginForm from "./components/login-form";
import { useState } from "react";

export default function SignUp() {
    const [status, changeStatus] = useState(false);

    return (
        <div className="w-full h-full flex flex-col items-center bg-[#FFFEF]">
            <Navs />

            <div className="flex flex-col items-center w-[660px] h-full mt-[30px] mb-[100px]
                rounded-[30px] opacity-70 bg-[#FFFEF6] shadow-[0px_0px_40px_0px_#D9D9D9]">

                {status ? <SignupForm /> : <LoginForm />}

                <button
                    onClick={() => changeStatus(!status)}
                    className="mt-4 text-blue-500 underline"
                >
                    {status ? '로그인으로 돌아가기' : '회원가입?'}
                </button>
            </div>
        </div>
    );
}

