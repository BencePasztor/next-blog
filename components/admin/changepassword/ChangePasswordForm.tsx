'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserChangePasswordBody, userChangePasswordSchema } from "@/utils/schemas/users"
import { changeUserPassword, UserChangePasswordError } from "@/utils/fetch/users"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"
import Input from "@/components/admin/ui/Input"
import Button from "@/components/common/ui/Button"

const ChangePasswordForm = () => {

    const router = useRouter()

    // Hook Form
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<UserChangePasswordBody>({
        resolver: zodResolver(userChangePasswordSchema),
        mode: "onBlur"
    })

    // Mutation
    const { mutate, isLoading } = useMutation({
        mutationFn: (data: UserChangePasswordBody) => changeUserPassword(data),
        onSuccess: () => {
            router.replace('/admin/users')
        },
        onError: (error: AxiosError<UserChangePasswordError>) => {
            // Field Error
            if (error.response?.data?.issues) {
                const issues = error.response?.data?.issues
                for (let key in issues) {
                    const errors = issues[key as keyof UserChangePasswordBody]?._errors
                    if (errors && errors.length > 0) {
                        setError(key as keyof UserChangePasswordBody, {
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
    const onSubmit: SubmitHandler<UserChangePasswordBody> = (data) => {
        mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('password')} error={errors?.password?.message?.toString()} id="password" label="Password" type="password" />
            <Input {...register('confirmPassword')} error={errors?.confirmPassword?.message?.toString()} id="confirmPassword" label="Confirm Password" type="password" />
            <Button disabled={isLoading} className="w-full text-base" type="submit">{isLoading ? 'Loading...' : 'Change Password'}</Button>
        </form>
    )
}

export default ChangePasswordForm