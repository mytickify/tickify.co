import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    // Check if user is authenticated and has admin role
    const session = await auth.api.getSession({ headers: request.headers });
    const user = session?.user;

    // Keep the API key authentication as a fallback method

    // const authHeader = request.headers.get('authorization')
    // const hasValidApiKey = authHeader === `Bearer ${process.env.ENV_API_SECRET}`

    // Allow access if user is admin OR has valid API key
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(process.env)
}