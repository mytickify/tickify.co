import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    // Check if user is authenticated and has admin role
    const session = await auth.api.getSession({ headers: request.headers });
    // Look user roles on database by session user id
    const roles = session?.user?.id ? await prisma.userRole.findMany({
        where: {
            userId: session?.user?.id,
        },
        include: {
            role: true,
        },
    }) : []
    // Keep the API key authentication as a fallback method
    const authHeader = request.headers.get('authorization')
    const hasValidApiKey = authHeader === `Bearer ${process.env.BETTER_AUTH_SECRET}`

    // Allow access if user is admin OR has valid API key
    if (hasValidApiKey || roles?.some((role) => role.role.name === 'ADMIN_WEB')) {
        return NextResponse.json({ error: 'Unauthorized', authHeader }, { status: 401 })
    }

    return NextResponse.json(process.env)
}