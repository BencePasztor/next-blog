import axiosInstance from "@/lib/axiosInstance"
import { User } from "@prisma/client"
import { UserCreateBody, UserUpdateBody, UserChangePasswordBody } from "../schemas/users"
import { FetchResponse, PaginatedResponse } from "./fetchTypes"

export type UserCreateSuccess = { temporaryPassword: string }
type SafeUser = Pick<User, "id" | "name" | "email">

export const getUsersPaginated = async (pageIndex: number, pageSize: number): Promise<PaginatedResponse<SafeUser>> => {
    const response = await axiosInstance.get('/users', {
        params: {
            pageIndex,
            pageSize
        }
    })

    return response.data
}

export const createUser = async (userData: UserCreateBody): Promise<UserCreateSuccess> => {
    const response = await axiosInstance.post('/users', userData)

    return response.data
}

export const updateUser = async (id: number, userData: UserUpdateBody): Promise<FetchResponse> => {
    const response = await axiosInstance.patch(`/users/${id}`, userData)

    return response.data
}

export const changeUserPassword = async (userData: UserChangePasswordBody): Promise<FetchResponse> => {
    const response = await axiosInstance.patch('/users/changepassword', userData)

    return response.data
}

export const deleteUser = async (id: number): Promise<FetchResponse> => {
    const response = await axiosInstance.delete(`/users/${id}`)

    return response.data
}