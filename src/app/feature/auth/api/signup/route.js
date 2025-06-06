import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/mongodb';
import User from '../../../../user/model/user';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const data = await request.json();
        const {
            userid,
            userpw,
            checkpw,
            username,
            name,
            phone,
            address,
            email,
        } = data;

        // 필수값 체크
        if (
            !userid ||
            !userpw ||
            !checkpw ||
            !username ||
            !name ||
            !phone ||
            !address ||
            !email
        ) {
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

        // DB 연결
        await dbConnect();

        // 중복 체크
        const existing = await User.findOne({ $or: [{ userid }, { email }] });
        if (existing) {
            return NextResponse.json(
                { success: false, message: '이미 존재하는 아이디 또는 이메일입니다.' },
                { status: 409 }
            );
        }

        // 비밀번호 암호화
        const hashedPw = await bcrypt.hash(userpw, 10);

        // 유저 정보 저장
        await User.create({
            userid,
            password: hashedPw,
            username,
            name,
            phone,
            address,
            email
        });

        // 성공 응답
        return NextResponse.json(
            { success: true },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: '서버 에러 발생' },
            { status: 500 }
        );
    }
}
