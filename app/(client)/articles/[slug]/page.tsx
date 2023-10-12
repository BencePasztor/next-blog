import Container from "@/components/common/ui/Container"
import Markdown from 'react-markdown'
import { getArticleBySlug } from '@/utils/actions/articles'
import remarkGfm from 'remark-gfm'

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const articleData = await getArticleBySlug(params.slug)

    return {
        title: articleData.title,
        description: articleData.lead
    }
}

const ArticlePage = async ({ params }: { params: { slug: string } }) => {
    const { title, cover, content } = await getArticleBySlug(params.slug)

    return (
        <Container className="bg-white shadow" as="section">
            {cover && <img className="w-full h-auto max-w-7xl mx-auto object-cover" src={cover} alt={title} />}
            <div className="mt-8 prose w-full max-w-none">
                <h1>{title}</h1>
                <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
            </div>
        </Container>
    )
}

export default ArticlePage

export const revalidate = 120