import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const client = await clientPromise
        const db = client.db('ddip')  // .env의 DB 이름과 동일하게
        const posts = await db.collection('posts').find({}).toArray()
        return NextResponse.json(posts)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
