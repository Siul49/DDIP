'use client'

import { useState, useEffect } from 'react';
import CategorySidebar from '@components/product/category-sidebar';
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";


export default function Product({ onSelect }) {
    const { id } = useParams(); // URL에서 받기
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const router = useRouter();

    const pleaseLogin = ()=>{
        alert('로그인창으로 이동합니다')
        router.push('/feature/auth');
    }

    useEffect(() => {
        fetch('/api/auth/check')
            .then(res => res.json())
            .then(data => setUser(data.user))
    }, [])


    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`/api/post/item/${id}`);
                const data = await response.json();

                if (data.success) {
                    setItem(data.data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('서버 에러가 발생했습니다.');
            }
        };

        if (id) {
            fetchItem();
        }
    }, [id]);

    return (
        <div className="flex justify-center">
            <main className="flex w-[1146px] h-full">
                <CategorySidebar />
                <div className="flex-1 ml-[30px]">
                    <section className="w-[950px] h-full mt-[190px] px-[20px] py-[40px]
            border-[1px] border-[#D9D9D9] rounded-[30px]">
                        <div className="flex gap-8 justify-center items-start">
                            {/* 좌측: 이미지 박스 */}
                            <div className="relative w-[320px] h-[320px] bg-[#FFF5DC] rounded-[20px] flex items-center justify-center">
                                <Image
                                    src="/placeholder.png" // 예시용 경로
                                    alt="상품 이미지"
                                    width={200}
                                    height={200}
                                    className="object-contain"
                                />
                            </div>

                            {/* 우측: 상품 정보 */}
                            <div className="flex flex-col gap-[2px] w-[420px] ml-[10px] mt-[20px] text-left">
                                <h2 className="text-[24px] font-medium"> {item ? (item.title):(id)} </h2>
                                <span>
                    <span className="text-[36px] font-semibold text-[#D42020] pr-[20px]">{item ? (item.pricePerEachPerson):("none")}</span>
                    <span className="text-[#888C85] text-[18px] line-through">{item ? (item.totalPrice):("none")}{}</span>
                </span>

                                <hr className="my-4 border-t border-[#D9D9D9]" />

                                <div className="space-y-[10px] mt-[px] text-medium text-gray-700">
                                    <p>모집 인원 | {item ? (item.totalNumberOfRecruits):("none")} ({item ? (item.numberOfRecruitedPersonnel):("none")}/{item ? (item.totalNumberOfRecruits):("none")})</p>
                                    <p>거래 방식 | {item ? (item.tradeType):("none")}</p>
                                    <p>카테고리 | {item ? (item.itemCategory):("none")}</p>
                                </div>

                                {user ? (
                                        <>
                                            {/* 버튼들 */}
                                            <div className="flex gap-[10px] mt-[20px] font-medium text-[14px] ">
                                                <button className="border-[2px] border-[#FADD88] w-[230px] ml-[-10px] px-4 py-2 rounded-[10px]
                        hover:bg-[#EDE8B8] hover:border-[#EDE8B8] active:scale-97 transition transform duration-150 ease-in-out">
                                                    톡 보내기</button>
                                                <button className="bg-[#FADD88] w-[230px] px-4 py-2 rounded-[10px]
                        hover:bg-[#E4C878] active:scale-97 transition transform duration-150 ease-in-out">
                                                    참여하기</button>
                                            </div></>
                                    )
                                    :
                                    (
                                        <>
                                            {/* 버튼들 */}
                                            <div className="flex gap-[10px] mt-[20px] font-medium text-[14px] ">
                                                <button className="border-[2px] border-[#FADD88] w-[230px] ml-[-10px] px-4 py-2 rounded-[10px]
                                        hover:bg-[#EDE8B8] hover:border-[#EDE8B8] active:scale-97 transition transform duration-150 ease-in-out"
                                                        onClick={() => {pleaseLogin()}}
                                                >
                                                    톡 보내기</button>
                                                <button className="bg-[#FADD88] w-[230px] px-4 py-2 rounded-[10px]
                                        hover:bg-[#E4C878] active:scale-97 transition transform duration-150 ease-in-out"
                                                        onClick={() => {pleaseLogin()}}
                                                >
                                                    참여하기</button>
                                            </div>
                                        </>
                                    )}

                            </div>
                        </div>

                        {/* 상품 설명 */}
                        <div className="mt-[50px] mx-[80px] text-gray-500 text-left">
                            <h3 className="mt-[20px] font-medium text-black ">상품 설명</h3>
                            <p className="mt-[10px] font-regular text-[15px] text-[#7C7C7]">
                                {item ? (item.description):("none")}
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
};