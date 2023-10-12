import { type NextRequest, NextResponse } from 'next/server'
import { db } from "@/lib/db"
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { userUpdateSchema } from '@/utils/schemas/users'
import { protectedRoute } from '@/utils/authUtils'


export const PATCH = protectedRoute(async (request: NextRequest, { params }: { params: { id: string } }) => {
    const userId = parseInt(params.id)

    try {
        const formObject = await request.json()

        // Parse Data
        const parseResult = await userUpdateSchema.safeParseAsync(formObject)

        // Return in case of error
        if (!parseResult.success) {
            return NextResponse.json({
                message: "Invalid Request",
                issues: parseResult.error.format()
            }, { status: 400 })
        }

        // Save User
        const user = await db.user.update({
            where: {
                id: userId
            },
            data: parseResult.data
        })

        return NextResponse.json({ message: "Success" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
})

export const DELETE = protectedRoute(async (request: NextRequest, { params }: { params: { id: string } }) => {
    const deleteUserId = parseInt(params.id)

    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (session.user.id === deleteUserId) {
        return NextResponse.json({ message: "User can't delete itself" }, { status: 403 })
    }

    try {
        const user = await db.user.delete({
            where: {
                id: deleteUserId
            }
        })
        return NextResponse.json({ message: "User Deleted" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
})
