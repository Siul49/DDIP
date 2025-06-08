import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect';
import bcrypt from 'bcryptjs';
import User from '../../../../user/model/user';

export async function POST(request) {
    try {
        await dbConnect(); // DB 연결

        const data = await request.json();
        const { userid, userpw, checkpw, username, name, phone, address, email } = data;

        // 필수값 체크 (기존 코드와 동일)
        if (!userid || !userpw || !checkpw || !username || !name || !phone || !address || !email) {
            return NextResponse.json(
                { success: false, message: '모든 빈칸을 채워주세요!' },
                { status: 400 }
            );
        }
        if (userpw !== checkpw) {
            return NextResponse.json(
                { success: false, message: '비밀번호를 다시 확인해주세요!' },
                { status: 400 }
            );
        }

        // 중복 체크 (Mongoose 메서드 사용)
        const existingUser = await User.findOne({
            $or: [{ userid }, { email }]
        });

        if (existingUser) {
            return NextResponse.json(
                { success: false, message: '이미 존재하는 아이디 또는 이메일입니다.' },
                { status: 409 }
            );
        }

        // 비밀번호 암호화
        const hashedPw = await bcrypt.hash(userpw, 10);

        // 데이터 삽입 (Mongoose 메서드 사용)
        const newUser = await User.create({
            userid,
            password: hashedPw,
            username,
            name,
            phone,
            address,
            email
        });

        return NextResponse.json(
            { success: true, message: '회원가입이 완료되었습니다!' },
            { status: 201 }
        );

    } catch (error) {
        console.error('회원가입 에러:', error);
        return NextResponse.json(
            { success: false, message: '서버 에러: ' + error.message },
            { status: 500 }
        );
    }
}
