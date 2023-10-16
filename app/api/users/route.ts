import { type NextRequest, NextResponse } from 'next/server'
import { db } from "@/lib/db"
import { userCreateSchema } from '@/utils/schemas/users'
import { generateRandomPassword, hashPassword } from '@/utils/passwordUtils'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { protectedRoute } from '@/utils/authUtils'

export const GET = protectedRoute(async (request: NextRequest) => {
    try {
        // Exclude Session User from the list
        let excludeUser = -1
        const session = await getServerSession(authOptions)
        if (session && session.user.id) {
            excludeUser = session.user.id
        }

        const pageIndexParam = request.nextUrl.searchParams.get('pageIndex')
        const pageSizeParam = request.nextUrl.searchParams.get('pageSize')

        const page = pageIndexParam ? parseInt(pageIndexParam) : 0
        const pageSize = pageSizeParam ? parseInt(pageSizeParam) : 10

        const data = await db.user.findMany({
            select: {
                id: true,
                email: true,
                name: true
            },
            where: {
                id: { not: excludeUser }
            },
            skip: page * pageSize,
            take: pageSize,
            orderBy: {
                id: 'desc'
            }
        })

        const count = await db.user.count()

        return NextResponse.json({
            data,
            pageCount: Math.ceil(count / pageSize)
        })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
})

export const POST = protectedRoute(async (request: NextRequest) => {
    try {
        const formObject = await request.json()

        // Extend the user schema with unique email validation
        const userCreateSchemaWithUniqueEmail = userCreateSchema.extend({
            email: userCreateSchema.shape.email.refine(async (email) => {
                return !await db.user.findFirst({ where: { email } })
            }, "This email is already taken by another user. Choose something else!")
        })

        // Parse Data
        const parseResult = await userCreateSchemaWithUniqueEmail.safeParseAsync(formObject)

        // Return in case of error
        if (!parseResult.success) {
            return NextResponse.json({
                message: "Invalid Request",
                issues: parseResult.error.format()
            }, { status: 400 })
        }

        // Create random password and hash it
        const randomPassword = generateRandomPassword()
        const hashedPassword = await hashPassword(randomPassword)

        // Save User
        await db.user.create({
            data: {
                ...parseResult.data,
                password: hashedPassword
            }
        })

        return NextResponse.json({ temporaryPassword: randomPassword }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
})