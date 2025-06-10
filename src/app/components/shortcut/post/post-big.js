'use client';

import { useState } from 'react';
import { useRef } from 'react';
import ConfirmModal from '@components/shortcut/post/post-confirm-modal';

export default function WritingPage() {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = () => {
        console.log('등록 처리 완료');
        setShowConfirm(false);
        onClose();
    };

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="fixed top-36 right-30 w-full h-[82%] max-w-5xl border border-[#D9D9D9] bg-[#FFFEF6] rounded-4xl z-100 p-8">
            {/*<h2 className="text-2xl font-bold mb-6">상품 등록</h2>*/}
            <form className="space-y-5">
                {/* 이미지 업로드 */}
                <div className="flex items-center">
                    <label className="w-26 text-lg font-semibold text-[#4D4D4D] mb-30">상품이미지</label>
                    <div
                        onClick={handleClick}
                        className="w-40 h-40 border border-[#D9D9D9] rounded-md bg-white flex flex-col items-center justify-center cursor-pointer"
                    ><span className="text-4xl">📷</span>
                        <span className="text-md text-gray-500 mt-1">이미지 등록</span></div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                    />
                </div>

                {/* 제목 */}
                <div className="flex items-center">
                    <label className="w-29 text-lg font-semibold text-[#4D4D4D]">제목</label>
                    <input type="text" placeholder="상품 이름을 작성하세요"
                           className="w-full border border-[#E0E0E0] rounded-lg p-2"/>
                </div>

                {/* 금액 + 인원 */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center w-1/2">
                        <label className="w-33 text-lg font-semibold text-[#4D4D4D]">금액</label>
                        <div className="flex items-center w-full">
                            <input type="number" placeholder="상품 금액"
                                   className="flex-1 border border-[#E0E0E0] rounded-lg p-2"/>
                            <span className="ml-2 text-[#4D4D4D]">원</span>
                        </div>
                    </div>
                    <div className="flex items-center w-1/2">
                        <label className="w-30 text-lg font-semibold text-[#4D4D4D]">인원</label>
                        <div className="flex items-center w-full">
                            <input type="number" placeholder="모집 인원"
                                   className="flex-1 border border-[#E0E0E0] rounded-lg p-2"/>
                            <span className="ml-2 text-[#4D4D4D]">명</span>
                        </div>
                    </div>
                </div>

                {/* 카테고리 + 거래방식 */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center w-1/2">
                        <label className="w-33 text-lg font-semibold text-[#4D4D4D]">카테고리</label>
                        <select className="w-full border border-[#E0E0E0] rounded-lg p-2">
                            <option className="text-[#888888]">카테고리</option>
                            <option>식재료</option>
                            <option>간편식/냉동식품</option>
                            <option>생활용품</option>
                            <option>대용량</option>
                            <option>배달음식</option>
                            <option>나눔템</option>
                        </select>
                    </div>
                    <div className="flex items-center w-1/2">
                        <label className="w-30 text-lg font-semibold text-[#4D4D4D]">거래방식</label>
                        <select className="w-full border border-[#E0E0E0] rounded-lg p-2">
                            <option className="text-[#888888]">거래 방식</option>
                            <option>직거래</option>
                            <option>택배</option>
                            <option>기타</option>
                        </select>
                    </div>
                </div>

                {/* 상세설명 */}
                <div className="flex items-center">
                    <label className="w-29 text-lg font-semibold text-[#4D4D4D] mb-60">상세설명</label>
                    <textarea
                        placeholder={'구매시기, 거래 장소, 상품 분배 기준, 하자 여부 등 상품 설명을 자세히 작성해주세요. \n전화번호, SNS 계정 등 개인정보는 입력이 제한될 수 있어요.'}
                        className="w-full border border-[#E0E0E0] rounded-lg p-2 h-70 resize-none"
                    ></textarea>
                </div>

                {/* 등록 버튼 */}
                <button type="submit"
                        className="w-[30%] h-12 right-8 bg-[#F5C24C] hover:bg-[#E5B33C] text-white text-lg font-bold py-2 rounded-xl absolute"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowConfirm(true)
                            ;
                        }}>
                    등록하기
                </button>
            </form>

            {/* 등록 확인 모달 */}
            {showConfirm && (
                <ConfirmModal
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={handleSubmit}
                />
            )}
        </div>
    );
}