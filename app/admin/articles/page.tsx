import Card from "@/components/admin/ui/Card"
import ArticlesTable from "@/components/admin/articles/ArticlesTable"
import Button from "@/components/common/ui/Button"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Articles',
}

const Articles = () => {

    return (
        <Card className="px-0">
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 mt-4 mb-8">
                <h1 className="text-3xl font-bold">Articles</h1>
                <Button href="/admin/articles/create" as={Link}>New Article</Button>
            </div>
            <ArticlesTable />
        </Card>
    )
}

export default Articles