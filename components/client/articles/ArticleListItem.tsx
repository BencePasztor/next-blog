import Link from "next/link"
import { ArticleExtended } from "@/lib/db"
import formatDate from "@/utils/dateUtils"

const ArticleListItem = ({title, lead, cover, slug, createdAt}: ArticleExtended) => {
    const url = `/articles/${slug}`

    return (
        <li className="overflow-hidden bg-white shadow-lg rounded-2xl">
            <Link href={url} className="aspect-[5/3] block w-full relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:pointer-events-none before:transition-colors before:bg-black/0 hover:before:bg-black/20 before:z-10 before:duration-200">
                <img className="object-cover w-full h-full transition-transform duration-200 hover:scale-105" src={cover ?? "/missing-image.png"} alt={title} />
            </Link>
            <div className="p-4">
                <Link href={url} className="block mb-2">
                    <h3 className="text-xl font-semibold duration-200 hover:text-emerald-600 transition-color">{title}</h3>
                </Link>
                <p className="text-base min-h-[calc(1.5rem_*_4)] line-clamp-4">{lead}</p>
                <p className="mt-4 text-sm text-slate-500">{formatDate(createdAt)}</p>
            </div>
        </li>
    )
}

export default ArticleListItem