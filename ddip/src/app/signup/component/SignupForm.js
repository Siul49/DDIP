import { useState } from 'react';
import { validateEmail, validatePassword } from './Validate';
import Input from './Input';
import AgreementBox from './Agreement';

export default function SignupForm() {
    const [agreed, setAgreed] = useState(false);
    const [form, setForm] = useState({
        userid: '',
        userpw: '',
        checkpw: '',
        username: '',
        name: '',
        phone: '',
        address: '',
        email: '',
    });

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!agreed) {
            alert("개인정보 수집 및 이용에 동의해주세요.");
            return;
        }

        if (!validateEmail(email)) return setError('유효한 이메일을 입력해주세요');
        if (!validatePassword(pw)) return setError('비밀번호는 8자 이상 입력해주세요');

        setError('');
        const result = await sendSignUpData({ email, password: pw });

        if (!result.success) setError('회원가입 실패');
    };

    return ( <form onSubmit={handleSubmit} className="flex flex-col max-w-[460px] gap-[30px] mx-auto">
        <Input 
            label="아이디"
            name="userid"
            value={form.userid}
            onChange={handleChange('userid')}
            placeholder="아이디를 입력해주세요."
            className="mt-[25px]"
        /><Input 
            label="별명"
            name="username"
            value={form.username}
            onChange={handleChange('username')}
            placeholder="별명을 입력해주세요. (최대 8자)"
        /><Input 
            label="비밀번호"
            name="userpw"
            value={form.userpw}checkpw
            onChange={handleChange('userpw')}
            placeholder="비밀번호를 입력해주세요. (8자 이상)"
        /><Input 
            label=""
            name="checkpw"
            value={form.checkpw}
            onChange={handleChange('checkpw')}
            placeholder="비밀번호를 입력해주세요. (8자 이상)"
            className="mt-[-15px]"
        /><Input 
            label="이름"
            name="name"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="이름을 입력해주세요."
        /><Input 
            label="전화번호"
            name="phone"
            value={form.phone}
            onChange={handleChange('phone')}
            placeholder="전화번호를 입력해주세요. ('-' 제외)"
        /><Input 
            label="주소"
            name="address"
            value={form.address}
            onChange={handleChange('address')}
            placeholder="주소를 입력해주세요."
        /><Input 
            label="이메일"
            name="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="example@email.com"
        />

        <AgreementBox agreed={agreed} onChange={setAgreed} />

        <button type="submit" 
        className="w-[250px] h-[50px] mx-auto mb-[50px] rounded-[20px] 
        bg-[#FADD88] hover:bg-[#E4C878] transition-colors duration-200
        font-[Pretendard Variable] text-[20px] font-semibold
        cursor-pointer block">회원가입하기</button>
    </form>
    )
}