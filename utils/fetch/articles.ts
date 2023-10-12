import axiosInstance from "@/lib/axiosInstance"
import { Article } from "@prisma/client"
import { ArticleExtended } from "@/lib/db"
import { InfiniteResponse, FetchResponse, PaginatedResponse } from "./fetchTypes"

export const getArticlesInfinite = async (cursor: string): Promise<InfiniteResponse<ArticleExtended>> => {
    const response = await axiosInstance.get('articles/infinite-scroll', {
        params: {
            cursor
        }
    })

    return response.data
}

export const getArticlesPaginated = async (pageIndex: number, pageSize: number): Promise<PaginatedResponse<Article>> => {
    const response = await axiosInstance.get('/articles', {
        params: {
            pageIndex,
            pageSize
        }
    })

    return response.data
}

export const createArticle = async (articleData: FormData): Promise<FetchResponse> => {
    const response = await axiosInstance.post('/articles', articleData, { headers: { "Content-type": "multipart/form-data", } })

    return response.data
}

export const updateArticle = async (id: number, articleData: FormData): Promise<FetchResponse> => {
    const response = await axiosInstance.patch(`/articles/${id}`, articleData, { headers: { "Content-type": "multipart/form-data", } })

    return response.data
}

export const deleteArticle = async (id: number): Promise<FetchResponse> => {
    const response = await axiosInstance.delete(`/articles/${id}`)

    return response.data
}