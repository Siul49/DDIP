import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect';
import bcrypt from 'bcryptjs';
import User from '../../../../user/model/User';
import { encrypt } from '../../../../../lib/session';

export async function POST(request) {
    try {
        const { userid, userpw } = await request.json();

        if (!userid || !userpw) {
            return NextResponse.json(
                { success: false, message: '아이디와 비밀번호를 모두 입력해주세요.' },
                { status: 400 }
            );
        }

        await dbConnect();

        const user = await User.findOne({ userid });
        if (!user) {
            return NextResponse.json(
                { success: false, message: '존재하지 않는 아이디입니다.' },
                { status: 404 }
            );
        }

        const isMatch = await bcrypt.compare(userpw, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: '비밀번호가 일치하지 않습니다.' },
                { status: 401 }
            );
        }


        const session = await encrypt({ userId: user.userid });

        // 응답 객체 생성
        const response = NextResponse.json(
            { success: true, username: user.username },
            { status: 200 }
        );

        // 쿠키 설정
        response.cookies.set('session', session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: '서버 에러 발생' },
            { status: 500 }
        );
    }
}
