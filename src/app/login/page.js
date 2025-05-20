// src/app/login/page.js

'use client';

import React, { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('로그인 시도:', email, password);
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이메일</label><br />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
                </div>
                <div>
                    <label>비밀번호</label><br />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                </div>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}
