'use client'

import {
    createColumnHelper,
} from '@tanstack/react-table'
import { ArticleExtended } from '@/lib/db'
import formatDate from "@/utils/dateUtils"
import { getArticlesPaginated } from "@/utils/fetch/articles"
import ArticlesRowActions from "./ArticlesRowActions"
import Table from "../ui/table/Table"
import Badge from "../ui/Badge"

const columnHelper = createColumnHelper<ArticleExtended>()

const columns = [
    columnHelper.display({
        id: "badge",
        cell: props => <Badge imageSrc={props.row.original.badge}/>
    }),
    columnHelper.accessor("title", {
        header: "Title",
        cell: info => info.getValue()
    }),
    columnHelper.accessor("lead", {
        header: "Lead",
        cell: info => info.getValue()
    }),
    columnHelper.accessor("createdAt", {
        header: "Created At",
        cell: info => formatDate(info.getValue())
    }),
    columnHelper.display({
        id: "actions",
        cell: props => <ArticlesRowActions title={props.row.original.title} id={props.row.original.id} slug={props.row.original.slug} />
    })
]

const ArticlesTable = () => {
    return (
        <Table itemsPerPage={10} columns={columns} queryKeyPartial="articles-admin" queryFn={getArticlesPaginated} />
    )
}

export default ArticlesTable