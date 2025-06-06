
import { useState } from 'react';
import { validatePassword } from './validate';
import Input from './input';
import Image from "next/image";

import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb'; // MongoDB 연결 모듈
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('user');              // user DB 사용
        const collection = db.collection('account'); // account 컬렉션

        const { userid, userpw } = await request.json();

        // 필수값 체크
        if (!userid || !userpw) {
            return NextResponse.json(
                { success: false, message: '아이디와 비밀번호를 모두 입력해주세요.' },
                { status: 400 }
            );
        }

        // 사용자 조회
        const user = await collection.findOne({ userid });
        if (!user) {
            return NextResponse.json(
                { success: false, message: '존재하지 않는 아이디입니다.' },
                { status: 404 }
            );
        }

        // 비밀번호 비교
        const isPasswordValid = await bcrypt.compare(userpw, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, message: '비밀번호가 일치하지 않습니다.' },
                { status: 401 }
            );
        }

        // 로그인 성공 시, 필요한 데이터 반환 (예: userid, username)
        return NextResponse.json(
            {
                success: true,
                message: '로그인 성공!',
                user: {
                    userid: user.userid,
                    username: user.username,
                    email: user.email,
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('로그인 에러:', error);
        return NextResponse.json(
            { success: false, message: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
