import { db, ArticleExtended } from "@/lib/db"

export const getArticleBySlug = async (slug: string): Promise<ArticleExtended> => {

    const article = await db.article.findUniqueOrThrow({
        where: {
            slug
        }
    })

    return article
}

export const getArticleById = async (id: number): Promise<ArticleExtended> => {

    const article = await db.article.findUniqueOrThrow({
        where: {
            id
        }
    })

    return article
}