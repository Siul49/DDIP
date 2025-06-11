// app/api/user/update/route.js
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from '../../../../lib/session' // 사용자님이 제공한 decrypt 함수 임포트
import User from '../../../../models/User' // 실제 사용자 모델 경로로 수정

export async function POST(request) {
    try {
        // 1. 쿠키에서 암호화된 세션 추출
        const cookieStore = cookies()
        const encryptedSession = cookieStore.get('auth_session')?.value

        // 2. 세션 복호화 (사용자님 코드 사용)
        const session = await decrypt(encryptedSession)
        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, message: '로그인이 필요해요!' },
                { status: 401 }
            )
        }

        // 3. 요청 데이터 파싱
        const formData = await request.json()

        // 4. 데이터베이스 업데이트
        const updatedUser = await User.findByIdAndUpdate(
            session.user.id,
            { $set: formData },
            { new: true }
        )

        // 5. 사용자 없음 처리
        if (!updatedUser) {
            return NextResponse.json(
                { success: false, message: '사용자를 찾을 수 없어요!' },
                { status: 404 }
            )
        }

        // 6. 성공 응답
        return NextResponse.json({
            success: true,
            user: {
                nickname: updatedUser.nickname,
                userid: updatedUser.userid,
                description: updatedUser.description,
                address: updatedUser.address,
                image: updatedUser.image
            }
        })

    } catch (error) {
        console.error('업데이트 실패:', error)
        return NextResponse.json(
            { success: false, message: '서버 오류가 발생했어요!' },
            { status: 500 }
        )
    }
}
