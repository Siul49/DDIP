import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect';
import Item from '../../../../../models/item';

// params를 함수 두 번째 인자로 받는다!
export async function GET(request, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const item = await Item.findById(id);

        if (!item) {
            return NextResponse.json(
                { success: false, message: '해당 상품을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        // 단일 아이템 반환
        return NextResponse.json(
            { success: true, data: item },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: '서버 에러 발생' },
            { status: 500 }
        );
    }
}
