import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation'
import { db } from "@/lib/db"

import { NextRequest, NextResponse } from 'next/server'

// Redirect the user to the 'changepassword' page on the first login
export const redirectToPasswordChangeOnFirstLogin = async () => {
    // Get Session
    const session = await getServerSession(authOptions)

    // Sessions can't be updated atm, so we have to check the db as well to make sure
    // Using the session might save some unnecessary db calls
    if (session && session.user.firstLogin) {
        const userId = session.user.id
        const user = await db.user.findFirst({ select: { firstLogin: true }, where: { id: userId } })

        if (!user) {
            redirect('/login')
        }

        if (user.firstLogin) {
            redirect('/changepassword')
        }
    }
}

// Wrapper for protected routes
// Returns Unauthorized Response if the session is empty
export const protectedRoute = (handler: (req: NextRequest, context: any) => Promise<NextResponse>) => {
    return async (req: any, context: any) => {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        return await handler(req, context)
    }
}