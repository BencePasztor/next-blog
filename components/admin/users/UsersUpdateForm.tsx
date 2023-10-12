'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userUpdateSchema, UserUpdateBody } from "@/utils/schemas/users"
import Input from "@/components/admin/ui/Input"
import Button from "@/components/common/ui/Button"
import { updateUser } from "@/utils/fetch/users"
import { FetchError } from "@/utils/fetch/fetchTypes"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"
import { User } from "@prisma/client"
import Link from "next/link"

const UsersUpdateForm = ({ initialData }: { initialData: User }) => {

    // Used for navigating back after successful mutations
    const router = useRouter()

    // Hook Form
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<UserUpdateBody>({
        resolver: zodResolver(userUpdateSchema),
        mode: "onBlur",
        values: initialData as UserUpdateBody
    })

    // Mutation
    const { mutate, isLoading } = useMutation({
        mutationFn: (data: UserUpdateBody) => updateUser(initialData.id, data),
        onSuccess: () => {
            router.replace('/admin/users')
        },
        onError: (error: AxiosError<FetchError<UserUpdateBody>>) => {
            // Field Error
            if (error.response?.data?.issues) {
                const issues = error.response?.data?.issues
                for (let key in issues) {
                    const errors = issues[key as keyof UserUpdateBody]?._errors
                    if (errors && errors.length > 0) {
                        setError(key as keyof UserUpdateBody, {
                            type: 'server',
                            message: errors[0]
                        })
                    }
                }
            }
            // Root Error
            else {
                setError('root.serverError', {
                    type: "server",
                    message: error.response?.data?.message
                })
            }

        },
    })

    // Submit Handler
    const onSubmit: SubmitHandler<UserUpdateBody> = (data) => {
        mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input id="name" label="Name" {...register("name")} required error={errors?.name?.message?.toString()} />
            <div className="flex items-center gap-2 mt-4">
                <Button disabled={isLoading} type="submit">{isLoading ? 'Loading...' : 'Update user'}</Button>
                <Button variant="light" outline as={Link} href="/admin/users">Cancel</Button>
            </div>
            {errors?.root?.serverError && <p className="font-medium text-red-600 my-4">{errors.root?.serverError.message}</p>}
        </form>
    )
}

export default UsersUpdateForm