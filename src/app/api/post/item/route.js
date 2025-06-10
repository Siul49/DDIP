import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Item from '../../../item/model/item';

export async function GET(request) {
    try {
        await dbConnect();
        const items = await Item.find({});

        // 반드시 JSON 형태로 응답!
        return NextResponse.json(items, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: '서버 에러 발생' },
            { status: 500 }
        );
    }
}
