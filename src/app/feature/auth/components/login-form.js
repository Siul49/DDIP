
import { useState } from 'react';
import { validatePassword } from './validate';
import Input from './input';
import Image from "next/image";
import {redirect} from "next/navigation";

export default function LoginForm() {
    const [form, setForm] = useState({
        userid: '',
        userpw: '',
    });
    const [error, setError] = useState('');

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // 비밀번호 유효성 검사
        if (!validatePassword(form.userpw)) {
            return setError('비밀번호는 8자 이상 입력해주세요');
        }

        try {
            const response = await fetch('/feature/auth/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const result = await response.json();

            if (result.success) {
                alert('아주 심각한 에러입니다!');
                alert('아주 심각한 에러입니다!');
                alert('아주 심각한 에러입니다!');
                alert('아주 심각한 에러입니다!');
                alert('아주 심각한 에러입니다!');
                alert('사실 에러 아니지롱 데헷😋');
            } else {
                setError(result.message || '로그인에 실패했습니다.');
            }
        } catch (err) {
            setError('로그인 요청 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="flex flex-col max-w-[420px] justify-items-center " style={{ paddingTop: '100px' }}>
            <Image
                src="/DDIP.png"
                alt="log"
                width={600}
                height={300}
            />
            <form onSubmit={handleSubmit} className="flex flex-col max-w-[460px] gap-[30px] mx-auto">
                <Input
                    label="아이디"
                    name="userid"
                    value={form.userid}
                    onChange={handleChange('userid')}
                    placeholder="아이디를 입력해주세요."
                    className="mt-[25px]"
                />
                <Input
                    label="비밀번호"
                    name="userpw"
                    value={form.userpw}
                    onChange={handleChange('userpw')}
                    placeholder="비밀번호를 입력해주세요. (8자 이상)"
                />
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button
                    type="submit"
                    className="w-[250px] h-[50px] mx-auto mb-[50px] rounded-[20px] bg-[#FADD88] hover:bg-[#E4C878] transition-colors duration-200 font-[Pretendard Variable] text-[20px] font-semibold cursor-pointer block"
                >
                    로그인하기
                </button>
            </form>
        </div>
    );
}
