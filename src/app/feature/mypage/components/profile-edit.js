'use client'
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ProfileEdit({ user, setUser, onCancel }) {
    const fileInputRef = useRef(null); // 파일 input 참조

    const [form, setForm] = useState({
        nickname: user.nickname,
        userid: user.userid,
        description: user.description,
        address: user.address,
        image: user.image,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setForm({ ...form, image: imageUrl }); // image로 저장
        }
    };

    const [formError, setFormError] = useState({
        nickname: '',
        userid: '',
        description: '',
        address: '',
    });

    const handleSave = async () => {
        fetch('/api/auth/check')
            .then(res => res.json())
            .then(data => setUser(data.user))

        const errors = {
            nickname: form.nickname.trim() ? '' : '별명을 입력해주세요.',
            userid: form.userid.trim() ? '' : '아이디를 입력해주세요.',
            description: form.description.trim() ? '' : '한줄 소개를 입력해주세요.',
            address: form.address.trim() ? '' : '주소를 입력해주세요.',
        };

        await fetch('/api/user/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
            .then(res => res.json())
            .then(data => {
                setUser(data.user); // MypageMain의 user 상태 갱신
                onCancel();
            });

        setFormError(errors);

        const hasError = Object.values(errors).some(error => error);
        if (hasError) return;

        setUser(form);
        onCancel();
    };


    return (
        <div className="flex gap-[30px] justify-center items-start">
            {/*  왼쪽: 프로필 이미지 */}
            <div className="relative w-[185px] h-[200px] rounded-[20px] flex-col items-center justify-start">
                {form.image ? (
                    <Image
                        name="image"
                        src={form.image}
                        alt="변경할 사진"
                        width={185}
                        height={185}
                        className="object-contain bg-[#FFF5DC] border-[#D9D9D9] border-[1px] rounded-[20px]"
                    />
                ) : (
                    <div className="w-[185px] h-[185px] bg-gray-200 rounded-[20px] flex items-center justify-center text-gray-500 text-sm">
                        이미지 없음
                    </div>
                )}

                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-[185px] h-[22px] border-[1px] border-[#D9D9D9] rounded-[10px] mt-[10px]
                        text-[13px] text-[#888C85] text-regular"
                >사진 변경하기
                </button>
                {/* 숨겨진 input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />
            </div>


            {/* 오른쪽: 이용자 정보 입력란 */}
            <div className="flex flex-col gap-[30px] w-[520px] ml-[20px] mt-[10px] text-left">
                <InputField
                    label="별명"
                    name="nickname"
                    value={form.nickname}
                    onChange={handleChange}
                    placeholder="별명을 입력하세요."
                    error={formError.nickname}
                />
                <InputField
                    label="아이디"
                    name="userid"
                    value={form.userid}
                    onChange={handleChange}
                    placeholder="아이디를 입력하세요."
                    error={formError.userid}
                />
                <InputField
                    label="한줄 소개"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="한줄 소개를 입력하세요."
                    error={formError.description}
                />
                <InputField
                    label="주소"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="주소를 입력하세요."
                    error={formError.address}
                />

                {/* 버튼들 */}
                <div className="flex justify-end gap-[10px] mt-[20px] font-medium text-[14px]">
                    <button
                        onClick={onCancel}
                        className="border-[2px] border-[#FADD88] w-[230px] ml-[-10px] px-4 py-2 rounded-[10px]
                            hover:bg-[#EDE8B8] hover:border-[#EDE8B8]
                            active:scale-97 transition transform duration-150 ease-in-out"
                    > 취소
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-[#FADD88] w-[230px] px-4 py-2 rounded-[10px]
                        hover:bg-[#E4C878]
                        active:scale-97 transition transform duration-150 ease-in-out"
                    > 저장
                    </button>
                </div>
            </div>
        </div>
    );
}

function InputField({ label, name, value, onChange, placeholder, error }) {
    return (
        <div>
            <label className="block text-[18px] text-[#000000] font-medium mb-1">
                {label}
            </label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                className="w-full mt-[5px] px-[15px] py-[7px] text-[14px] font-regular
                        border-[1px] border-[#D9D9D9] rounded-[10px]
                        focus:outline-none focus:border-[#888C85]"
                placeholder={placeholder}
            />
            {error && (
                <p className="text-[#D42020] text-sm mt-[4px] ml-[8px]">* {error}</p>
            )}
        </div>
    );
}
