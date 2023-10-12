import ArticleListItem from "./ArticleListItem"
import { ArticleExtended } from "@/lib/db"

const ArticleList = ({articles}: {articles: ArticleExtended[]}) => {

    if(articles.length === 0){
        return (
            <p className="text-lg my-4">There are no articles to display.</p>
        )
    }

    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {articles.map(item => <ArticleListItem key={item.id} {...item} />)}
        </ul>
    )
}

export default ArticleList