import { type NextRequest, NextResponse } from 'next/server'
import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"

export async function GET(request: NextRequest) {
    try {
        const take = 6
        const cursorParam = request.nextUrl.searchParams.get('cursor')

        let queryArgs: Prisma.ArticleFindManyArgs = {
            take: take + 1, //We add one to get the next cursor
            orderBy: {
                createdAt: 'desc'
            }
        }

        if (cursorParam) {
            queryArgs = {
                cursor: {
                    id: parseInt(cursorParam)
                },
                ...queryArgs
            }
        }

        const results = await db.article.findMany(queryArgs)

        // If we have more items than the take, remove the last item and set it's id as the nextCursor
        let nextCursor = null
        if (results.length > take) {
            const nextItem = results.pop()
            if(nextItem){
                nextCursor = nextItem.id
            }
        }

        const data = {
            data: results,
            nextCursor
        };

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

// export async function POST(request: NextRequest, { params }: { params: { id: number } }) {
//     const articleId = params.id

//     try {
//         const article = await db.article.findUniqueOrThrow({
//             where: {
//                 id: articleId
//             }
//         })

//         return NextResponse.json({ ...article }, { status: 201 })
//     } catch (error) {
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//     }
// }