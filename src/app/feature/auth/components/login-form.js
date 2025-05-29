import { useState } from 'react';
import { validatePassword } from './validate';
import Input from './input';
import Image from "next/image";

export default function LoginForm() {
    const [form, setForm] = useState({
        userid: '',
        userpw: '',
    });

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(pw)) return setError('비밀번호는 8자 이상 입력해주세요');

    };

    return (
        <div className="flex flex-col max-w-[420px] justify-items-center " style={{ paddingTop: '100px' }}>
        <Image
            src="/DDIP.png"
            alt="log"
            width={600}
            height={300}/>
        <form onSubmit={handleSubmit} className="flex flex-col max-w-[460px] gap-[30px] mx-auto">
            <Input
                label="아이디"
                name="userid"
                value={form.userid}
                onChange={handleChange('userid')}
                placeholder="아이디를 입력해주세요."
                className="mt-[25px]"
            /><Input
            label="비밀번호"
            name="userpw"
            value={form.userpw}checkpw
            onChange={handleChange('userpw')}
            placeholder="비밀번호를 입력해주세요. (8자 이상)"
        />
            <button type="submit"
                    className="w-[250px] h-[50px] mx-auto mb-[50px] rounded-[20px]
        bg-[#FADD88] hover:bg-[#E4C878] transition-colors duration-200
        font-[Pretendard Variable] text-[20px] font-semibold
        cursor-pointer block">로그인하기</button>
        </form>
        </div>
    )
}