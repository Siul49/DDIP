'use client'
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ProfileEdit({ userInfo, setUserInfo, onCancel }) {
    const fileInputRef = useRef(null); // 파일 input 참조

    const [form, setForm] = useState({
        name: userInfo.name,
        username: userInfo.username,
        bio: userInfo.bio,
        address: userInfo.address,
        picture: userInfo.picture,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // 프로필 이미지 변경 시 미리보기 처리
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setForm({ ...form, picture: imageUrl });
        }
    };

    const [formError, setFormError] = useState({
        name: '',
        username: '',
        bio: '',
        address: '',
    });

    const handleSave = () => {
        //여기에 api 추가하래유

        const errors = {
            name: form.name.trim() ? '' : '별명을 입력해주세요.',
            username: form.username.trim() ? '' : '아이디를 입력해주세요.',
            bio: form.bio.trim() ? '' : '한줄 소개를 입력해주세요.',
            address: form.address.trim() ? '' : '주소를 입력해주세요.',
        };

        setFormError(errors);

        const hasError = Object.values(errors).some(error => error);
        if (hasError) return;

        setUserInfo(form); // 부모 컴포넌트에 변경 반영
        onCancel(); // 편집 종료
    };

    return (
        <div className="flex gap-[30px] justify-center items-start">
            {/*  왼쪽: 프로필 이미지 */}
            <div className="relative w-[185px] h-[200px] rounded-[20px] flex-col items-center justify-start">
                {form.picture ? (
                    <Image
                        name="picture"
                        src= {form.picture}
                        alt="변경할 사진"
                        width={185}
                        height={185}
                        className="object-contain bg-[#FFF5DC] border-[#D9D9D9] border-[1px] rounded-[20px]"
                    /> ) : (
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
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="별명을 입력하세요."
                    error={formError.name}
                />
                <InputField
                    label="아이디"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="아이디를 입력하세요."
                    error={formError.username}
                />
                <InputField
                    label="한줄 소개"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="한줄 소개를 입력하세요."
                    error={formError.bio}
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
