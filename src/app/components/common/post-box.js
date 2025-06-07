'use client';

import { useState } from 'react';
import ConfirmModal from './post-confirm';
import WritingPage from './post-page';

export default function PostBox({ onClose }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showFullPage, setShowFullPage] = useState(false);

    const handleSubmit = () => {
        console.log('등록 처리 완료');
        setShowConfirm(false);
        onClose();
    };

    const handleExpand = () => {
        setShowFullPage(true);
    };

    if (showFullPage) {
        return <WritingPage />;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full z-100 flex justify-center items-center bg-black/50">
            <div className="w-full max-w-3xl p-10 bg-[#FFFEF6] rounded-4xl shadow-lg z-50 relative">
                <h2 className="text-2xl font-bold mb-6">상품 등록</h2>
                <form className="space-y-5">
                    {/* 이미지 업로드 */}
                    <div className="flex items-center">
                        <label className="w-26 text-md font-semibold text-[#4D4D4D]">상품이미지</label>
                        <input type="file" className="w-full border border-[#E0E0E0] rounded-lg p-2"/>
                    </div>

                    {/* 제목 */}
                    <div className="flex items-center">
                        <label className="w-26 text-md font-semibold text-[#4D4D4D]">제목</label>
                        <input type="text" placeholder="상품 이름을 작성하세요"
                               className="w-full border border-[#E0E0E0] rounded-lg p-2"/>
                    </div>

                    {/* 금액 + 인원 */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center w-1/2">
                            <label className="w-22 text-md font-semibold text-[#4D4D4D]">금액</label>
                            <div className="flex items-center">
                                <input type="number" placeholder="상품 금액"
                                       className="w-full border border-[#E0E0E0] rounded-lg p-2"/>
                                <span className="text-[#4D4D4D]">원</span>
                            </div>
                        </div>
                        <div className="flex items-center w-1/2">
                            <label className="w-22 text-md font-semibold text-[#4D4D4D]">인원</label>
                            <div className="flex items-center">
                                <input type="number" placeholder="모집 인원"
                                       className="w-full border border-[#E0E0E0] rounded-lg p-2"/>
                                <span className="text-[#4D4D4D]">명</span>
                            </div>
                        </div>
                    </div>

                    {/* 카테고리 + 거래방식 */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center w-1/2">
                            <label className="w-30 text-md font-semibold text-[#4D4D4D]">카테고리</label>
                            <select className="w-full border border-[#E0E0E0] rounded-lg p-2">
                                <option>카테고리</option>
                                <option>식재료</option>
                                <option>간편식/냉동식품</option>
                                <option>생활용품</option>
                                <option>대용량</option>
                                <option>배달음식</option>
                                <option>나눔템</option>
                            </select>
                        </div>
                        <div className="flex items-center w-1/2">
                            <label className="w-30 text-md font-semibold text-[#4D4D4D]">거래방식</label>
                            <select className="w-full border border-[#E0E0E0] rounded-lg p-2">
                                <option>거래 방식</option>
                                <option>직거래</option>
                                <option>택배</option>
                                <option>기타</option>
                            </select>
                        </div>
                    </div>

                    {/* 상세설명 */}
                    <div className="flex items-center">
                        <label className="w-26 text-md font-semibold text-[#4D4D4D] mb-20">상세설명</label>
                        <textarea
                            placeholder={'구매시기, 거래 장소, 상품 분배 기준, 하자 여부 등 상품 설명을 자세히 작성해주세요. \n전화번호, SNS 계정 등 개인정보는 입력이 제한될 수 있어요.'}
                            className="w-full border border-[#E0E0E0] rounded-lg p-2 h-32 resize-none"
                        ></textarea>
                    </div>

                    {/* 등록 버튼 */}
                    <button type="submit"
                            className="w-[50%] h-12 bg-[#F5C24C] hover:bg-[#E5B33C] text-white text-lg font-bold py-2 rounded-3xl"
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

                <button onClick={handleExpand} className="absolute top-5 left-7 text-[#4D4D4D] hover:text-black text-2xl">
                    ⇱
                </button>

                <button onClick={onClose} className="absolute top-5 right-7 text-[#4D4D4D] hover:text-black text-2xl">
                    ✖
                </button>
            </div>
        </div>
    );
}
