import Card from "@/components/admin/ui/Card"
import ArticlesForm from "@/components/admin/articles/ArticlesForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Create Article',
}

const CreateArticle = () => {

    return (
        <Card className="px-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 mb-8">
                <h1 className="text-3xl font-bold">Create Article</h1>
            </div>
            <ArticlesForm mode="create" />
        </Card>
    )
}

export default CreateArticle