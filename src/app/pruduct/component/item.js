import Image from 'next/image'
import { useState, useEffect } from 'react';


export default function ItemMain({ selectedProduct, onSelect }) {
    return (
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
                    <h2 className="text-[24px] font-medium"> 뿌잉뿌잉 </h2>
                    <span>
                    <span className="text-[36px] font-semibold text-[#D42020] pr-[20px]">2,500원</span>
                    <span className="text-[#888C85] text-[18px] line-through">30,000원</span>
                </span>

                    <hr className="my-4 border-t border-[#D9D9D9]" />

                    <div className="space-y-[10px] mt-[px] text-medium text-gray-700">

                        <p>모집 인원 | 8명 (2/8)</p>
                        <p>거래 방식 | 직거래</p>
                        <p>카테고리 | 식재료</p>
                    </div>

                    {/* 버튼들 */}
                    <div className="flex gap-[10px] mt-[20px] font-medium text-[14px] ">
                        <button className="border-[2px] border-[#FADD88] w-[230px] ml-[-10px] px-4 py-2 rounded-[10px]
                        hover:bg-[#EDE8B8] hover:border-[#EDE8B8] active:scale-97 transition transform duration-150 ease-in-out">
                            톡 보내기</button>
                        <button className="bg-[#FADD88] w-[230px] px-4 py-2 rounded-[10px]
                        hover:bg-[#E4C878] active:scale-97 transition transform duration-150 ease-in-out">
                            참여하기</button>
                    </div>
                </div>
            </div>

            {/* 상품 설명 */}
            <div className="mt-[50px] mx-[80px] text-gray-500 text-left">
                <h3 className="mt-[20px] font-medium text-black ">상품 설명</h3>
                <p className="mt-[10px] font-regular text-[15px] text-[#7C7C7]">
                    상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명<br />
                    상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명<br />
                    상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명<br />
                    상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명
                </p>
            </div>
        </section>
    );
}