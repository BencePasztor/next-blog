import { type NextRequest, NextResponse } from 'next/server'
import { db } from "@/lib/db"
import { articleBodySchema } from '@/utils/schemas/articles'
import { saveArticleImage, deleteArticleDirectory } from '@/utils/articleUtils'
import { Article } from '@prisma/client'
import { protectedRoute } from '@/utils/authUtils'

export const PATCH = protectedRoute(async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const articleId = parseInt(params.id)

        //For the image file
        const formData = await request.formData()

        // For Zod
        const formObject = Object.fromEntries(formData)

        // Extend the article schema with slug validation
        const articleBodyUnique = articleBodySchema.extend({
            slug: articleBodySchema.shape.slug.refine(async (slug) => {
                return !await db.article.findFirst({ where: { slug, id: { not: articleId } } })
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

        // Save image
        let imagePath = ''
        if (image) {
            const uploadResult = await saveArticleImage(image, articleId)
            if (uploadResult.success && uploadResult.filePath) {
                imagePath = uploadResult.filePath
            }
        }

        // If the image is empty(meaning it hasn't changed) leave it out from the updated data
        // If it has changed, set the "image" property to the new image
        let mergedArticleData: Partial<Article> = { ...dataWithoutImage }
        if (imagePath) {
            mergedArticleData.image = imagePath
        }

        // Update article
        const article = await db.article.update({
            where: {
                id: articleId
            },
            data: mergedArticleData
        })

        return NextResponse.json(article, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
})

export const DELETE = protectedRoute(async (request: NextRequest, { params }: { params: { id: string } }) => {
    const articleId = parseInt(params.id)

    try {
        const article = await db.article.delete({
            where: {
                id: articleId
            }
        })

        // Delete article images (await is not necessary)
        if (article) {
            deleteArticleDirectory(article.id)
        }

        return NextResponse.json({ message: "Article Deleted" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
})
