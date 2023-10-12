'use client'

import ArticleList from "./ArticleList"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getArticlesInfinite } from "@/utils/fetch/articles"
import Spinner from "@/components/common/ui/Spinner"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { ArticleExtended } from "@/lib/db"

const LatestArticles = () => {
    //Used to determine if the empty div at the bottom of the article list is visible
    const [observedRef, inView] = useInView()

    const {
        data,
        isError,
        isSuccess,
        isFetching,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["articles"],
        queryFn: ({ pageParam }) => getArticlesInfinite(pageParam),
        getNextPageParam: (lastPage) => {
            return lastPage?.nextCursor
        }
    })

    // Fetch the next page if the div at the bottom of the article list is visible
    useEffect(() => {
        if (inView && hasNextPage && !isFetching) {
            fetchNextPage()
        }
    }, [inView, isFetching, hasNextPage])

    // Article data array merged from pages
    let articlesData: ArticleExtended[] = []
    if (isSuccess) {
        articlesData = data.pages.reduce<ArticleExtended[]>((accumulator, currentValue) => {
            return [...accumulator, ...currentValue.data]
        }, [])
    }

    return (
        <div>
            {isError && <p className="text-red-700 text-lg text-center my-8">An error occured.</p>}
            {isSuccess && (<ArticleList articles={articlesData} />)}
            {isFetching && <div className="my-8"><Spinner /></div>}
            {(isSuccess && !hasNextPage && articlesData.length > 0) && <p className="text-lg text-center my-4">There are no articles left to show.</p>}
            {/* Used to triger fetchNextPage */}
            {isSuccess && <div ref={observedRef}></div>}
        </div>

    )
}

export default LatestArticles