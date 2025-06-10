'use client';

import {useEffect, useState} from 'react';
import ConfirmModal from './post-confirm-modal';
import WritingPage from './post-big';

export default function PostBox({ onClose }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showFullPage, setShowFullPage] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null)
    const [form, setForm] = useState({
        title: '',
        description: '',
        writer: '',
        itemCategory: '',
        tradeType: '',
        totalNumberOfRecruits: 1,
        numberOfRecruitedPersonnel:0,
        totalPrice: 1,
        pricePerEachPerson: 1,
        image: null,
    });


    useEffect(() => {
        fetch('/api/auth/check')
            .then(res => res.json())
            .then(data => {
                if (data.user) setUser(data.user);
            })
            .catch(error => console.error('유저 정보 불러오기 실패:', error));
    }, []);


    useEffect(() => {
        if (form.totalPrice > 0 && form.totalNumberOfRecruits > 0) {
            const calculatedPrice = form.totalPrice / form.totalNumberOfRecruits;
            setForm(prev => ({
                ...prev,
                pricePerEachPerson: calculatedPrice
            }));
        }
    }, [form.totalPrice, form.totalNumberOfRecruits]);

    // input 값이 바뀔 때마다 form state 업데이트
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    // 이미지 파일 따로 처리
    const handleImageChange = (e) => {
        setForm((prev) => ({
            ...prev,
            image: e.target.files[0], // 실제 파일 객체 저장
        }));
    };

    // 등록 처리 함수 수정본
    const handleSubmit = async () => {
        setShowConfirm(false);

        try {
            if (!user?.nickname) throw new Error('로그인 정보가 없습니다');
            if (!form.itemCategory || !form.tradeType) {
                throw new Error('카테고리와 거래방식을 선택해주세요');
            }

            const payload = {
                ...form,
                writer: user.nickname,
            };

            let body, headers;

            if (form.image) {
                body = new FormData();
                Object.entries(payload).forEach(([key, value]) => {
                    if (value !== null) {
                        if (key === 'image') {
                            body.append(key, value, value.name);
                        } else {
                            body.append(key, value.toString()); // 모든 값을 문자열로 변환
                        }
                    }
                });
                headers = undefined;
            } else {
                body = JSON.stringify(payload);
                headers = { 'Content-Type': 'application/json' };
            }

            const response = await fetch('/api/post/write', { method: 'POST', headers, body });

            // 응답이 JSON인지 확인
            const contentType = response.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`서버 응답 오류: ${text.slice(0, 100)}`);
            }

            const result = await response.json();

            if (result.success) {
                alert('띱 올리기 완료!');
                onClose();
            } else {
                setError(result.message || '서버 오류 발생');
            }
        } catch (err) {
            setError(err.message);
            console.error('등록 실패:', err);
        }
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
                        <input
                            type="file"
                            className="w-full border border-[#E0E0E0] rounded-lg p-2"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {form.image && <span className="ml-2">{form.image.name}</span>}
                    </div>

                    {/* 제목 */}
                    <div className="flex items-center">
                        <label className="w-26 text-md font-semibold text-[#4D4D4D]">제목</label>
                        <input
                            type="text"
                            placeholder="상품 이름을 작성하세요"
                            className="w-full border border-[#E0E0E0] rounded-lg p-2"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                        />
                    </div>

                    {/* 금액 + 인원 */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center w-1/2">
                            <label className="w-22 text-md font-semibold text-[#4D4D4D]">금액</label>
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    placeholder="상품 금액"
                                    className="w-full border border-[#E0E0E0] rounded-lg p-2"
                                    name="totalPrice"
                                    value={form.totalPrice}
                                    onChange={handleChange}
                                />
                                <span className="text-[#4D4D4D]">원</span>
                            </div>
                        </div>
                        <div className="flex items-center w-1/2">
                            <label className="w-22 text-md font-semibold text-[#4D4D4D]">인원</label>
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    placeholder="모집 인원"
                                    className="w-full border border-[#E0E0E0] rounded-lg p-2"
                                    name="totalNumberOfRecruits"
                                    value={form.totalNumberOfRecruits}
                                    onChange={handleChange}
                                />
                                <span className="text-[#4D4D4D]">명</span>
                            </div>
                        </div>
                    </div>

                    {/* 카테고리 + 거래방식 */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center w-1/2">
                            <label className="w-30 text-md font-semibold text-[#4D4D4D]">카테고리</label>
                            <select
                                className="w-full border border-[#E0E0E0] rounded-lg p-2"
                                name="itemCategory"
                                value={form.itemCategory}
                                onChange={handleChange}
                            >
                                <option value="">카테고리</option>
                                <option value="식재료">식재료</option>
                                <option value="간편식/냉동식품">간편식/냉동식품</option>
                                <option value="생활용품">생활용품</option>
                                <option value="대용량">대용량</option>
                                <option value="배달음식">배달음식</option>
                                <option value="나눔템">나눔템</option>
                            </select>
                        </div>
                        <div className="flex items-center w-1/2">
                            <label className="w-30 text-md font-semibold text-[#4D4D4D]">거래방식</label>
                            <select
                                className="w-full border border-[#E0E0E0] rounded-lg p-2"
                                name="tradeType"
                                value={form.tradeType}
                                onChange={handleChange}
                            >
                                <option value="">거래 방식</option>
                                <option value="직거래">직거래</option>
                                <option value="택배">택배</option>
                                <option value="기타">기타</option>
                            </select>
                        </div>
                    </div>

                    {/* 상세설명 */}
                    <div className="flex items-center">
                        <label className="w-26 text-md font-semibold text-[#4D4D4D] mb-20">상세설명</label>
                        <textarea
                            placeholder={'구매시기, 거래 장소, 상품 분배 기준, 하자 여부 등 상품 설명을 자세히 작성해주세요. \n전화번호, SNS 계정 등 개인정보는 입력이 제한될 수 있어요.'}
                            className="w-full border border-[#E0E0E0] rounded-lg p-2 h-32 resize-none"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />
                    </div>

                    {/* 등록 버튼 */}
                    <button
                        type="button"
                        className="w-[50%] h-12 bg-[#F5C24C] hover:bg-[#E5B33C] text-white text-lg font-bold py-2 rounded-3xl"
                        onClick={() => setShowConfirm(true)}
                    >
                        등록하기
                    </button>
                </form>

                {/* 에러 메시지 표시 */}
                {error && (
                    <div className="text-red-500 mt-2">{error}</div>
                )}

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
