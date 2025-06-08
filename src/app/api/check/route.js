// app/api/auth/check/route.js
import { NextResponse } from 'next/server'
import { decrypt } from '../../../lib/session'

export async function GET(request) {
    try {
        const session = request.cookies.get('session')?.value
        if (!session) return NextResponse.json({ user: null })

        const user = await decrypt(session)
        return NextResponse.json({ user })
    } catch (error) {
        return NextResponse.json({ user: null })
    }
}
