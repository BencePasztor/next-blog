import { ZodFormattedError } from "zod"

type FetchResponse = {
    message: string
}

type FetchError<T> = {
    message: string,
    issues?: ZodFormattedError<T>
}

type PaginatedResponse<T> = {
    data: T[],
    pageCount: number
}

type InfiniteResponse<T> = {
    data: T[],
    nextCursor: number
}