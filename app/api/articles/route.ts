import { type NextRequest, NextResponse } from 'next/server'
import { db } from "@/lib/db"
import { articleBodySchema } from '@/utils/schemas/articles'
import { saveArticleImage } from '@/utils/articleUtils'
import { protectedRoute } from '@/utils/authUtils'

export const GET = protectedRoute(async (request: NextRequest) => {
    try {
        const pageIndexParam = request.nextUrl.searchParams.get('pageIndex')
        const pageSizeParam = request.nextUrl.searchParams.get('pageSize')

        const page = pageIndexParam ? parseInt(pageIndexParam) : 0
        const pageSize = pageSizeParam ? parseInt(pageSizeParam) : 10

        const data = await db.article.findMany({
            skip: page * pageSize,
            take: pageSize,
            orderBy: {
                createdAt: 'desc'
            }
        })

        const count = await db.article.count()

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
        //For the image file
        const formData = await request.formData()

        // For Zod Validation
        const formObject = Object.fromEntries(formData)

        // Extend the article schema with slug validation
        const articleBodyUnique = articleBodySchema.extend({
            slug: articleBodySchema.shape.slug.refine(async (slug) => {
                return !await db.article.findFirst({ where: { slug } })
            }, "This slug is already taken by another article. Choose something else!")
        })

        // Parse Data
        const parseResult = await articleBodyUnique.safeParseAsync(formObject)

        // Return in case of error
        if (!parseResult.success) {
            return NextResponse.json({
                message: "Invalid Request",
                issues: parseResult.error.format()
            }, { status: 400 })
        }

        // Separate image from data
        const { image, ...dataWithoutImage } = parseResult.data

        // Save Article
        const article = await db.article.create({ data: dataWithoutImage })

        // Save image
        if (image) {
            const uploadResult = await saveArticleImage(image, article.id)
            if (uploadResult.success && uploadResult.filePath) {
                const imagePath = uploadResult.filePath
                await db.article.update({
                    where: { id: article.id }, data: {
                        image: imagePath
                    }
                })
            }
        }

        return NextResponse.json(article, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
})