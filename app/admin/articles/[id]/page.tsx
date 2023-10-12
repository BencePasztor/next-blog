import Card from "@/components/admin/ui/Card"
import ArticlesForm from "@/components/admin/articles/ArticlesForm"
import { getArticleById } from '@/utils/actions/articles'
import { ArticleExtended } from "@/lib/db"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Update Article',
}

const UpdateArticle = async ({ params }: { params: { id: string } }) => {

    const initialData = await getArticleById(parseInt(params.id)) as ArticleExtended

    return (
        <Card className="px-4">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8 mt-4">
                <h1 className="font-bold text-3xl">Update Article</h1>
            </div>
            <ArticlesForm mode="update" initialData={initialData} />
        </Card>
    )
}

export default UpdateArticle

export const revalidate = 0