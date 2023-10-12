'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userCreateSchema, UserCreateBody } from "@/utils/schemas/users"
import Input from "@/components/admin/ui/Input"
import Button from "@/components/common/ui/Button"
import { createUser } from "@/utils/fetch/users"
import { FetchError } from "@/utils/fetch/fetchTypes"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AxiosError } from "axios"
import { useModal } from "@/providers/admin/ModalProvider"

const UsersCreateForm = () => {

    // Used for navigating back after successful mutations
    const router = useRouter()

    // Hook Form
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<UserCreateBody>({
        resolver: zodResolver(userCreateSchema),
        mode: "onBlur",
    })

    // Success Modal
    const { openModal } = useModal()

    // Mutation
    const { mutate, isLoading } = useMutation({
        mutationFn: (data: UserCreateBody) => createUser(data),
        onSuccess: (data) => {
            openModal({
                title: "User Created",
                body: (
                    <>
                        <p>This is the temporary password:</p>
                        <p className="font-bold">{data.temporaryPassword}</p>
                    </>
                ),
                confirmText: "OK",
                confirmVariant: "primary",
                showCancelButton: false,
                confirmCallback: () => { router.replace('/admin/users') }
            })
        },
        onError: (error: AxiosError<FetchError<UserCreateBody>>) => {
            // Field Error
            if (error.response?.data?.issues) {
                const issues = error.response?.data?.issues
                for (let key in issues) {
                    const errors = issues[key as keyof UserCreateBody]?._errors
                    if (errors && errors.length > 0) {
                        setError(key as keyof UserCreateBody, {
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
    const onSubmit: SubmitHandler<UserCreateBody> = (data) => {
        mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input id="name" label="Name" {...register("name")} required error={errors?.name?.message?.toString()} />
            <Input id="email" label="Email" {...register("email")} type="email" required error={errors?.email?.message?.toString()} />
            <div className="flex items-center gap-2 mt-4">
                <Button disabled={isLoading} type="submit">{isLoading ? 'Loading...' : 'Create user'}</Button>
                <Button variant="light" outline as={Link} href="/admin/users">Cancel</Button>
            </div>
            {errors?.root?.serverError && <p className="font-medium text-red-600 my-4">{errors.root?.serverError.message}</p>}
        </form>
    )
}

export default UsersCreateForm