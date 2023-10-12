import { type NextRequest, NextResponse } from 'next/server'
import { db } from "@/lib/db"
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { userChangePasswordSchema } from '@/utils/schemas/users'
import { hashPassword } from '@/utils/passwordUtils'
import { protectedRoute } from '@/utils/authUtils'

export const PATCH = protectedRoute(async (request: NextRequest) => {
    // Get Session UserId
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const userId = session.user.id

    try {
        const formObject = await request.json()

        // Parse Data
        const parseResult = await userChangePasswordSchema.safeParseAsync(formObject)

        // Return in case of error
        if (!parseResult.success) {
            return NextResponse.json({
                message: "Invalid Request",
                issues: parseResult.error.format()
            }, { status: 400 })
        }

        const hashedPassword = await hashPassword(parseResult.data.password)

        // Save User
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                firstLogin: false,
                password: hashedPassword
            }
        })

        return NextResponse.json({ message: "Success" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
})