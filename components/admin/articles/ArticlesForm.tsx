'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { articleBodySchema, ArticleBody } from "@/utils/schemas/articles"
import Input from "@/components/admin/ui/Input"
import ImageInput from "@/components/admin/ui/ImageInput"
import Button from "@/components/common/ui/Button"
import { createArticle, updateArticle } from "@/utils/fetch/articles"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import Link from "next/link"
import slugify from "slugify"
import { ChangeEvent } from "react"
import { AxiosError } from "axios"
import MDXEditorAdmin from "../ui/mdx/Editor"
import { FetchResponse, FetchError } from "@/utils/fetch/fetchTypes"
import { ArticleExtended } from "@/lib/db"

type ArticleFormProps = {
    mode: "create" | "update"
    initialData?: ArticleExtended
}

const ArticlesForm = ({ mode = "create", initialData }: ArticleFormProps) => {

    // Used for navigating back after successful mutations
    const router = useRouter()

    // Hook Form
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
        control
    } = useForm<ArticleBody>({
        resolver: zodResolver(articleBodySchema),
        mode: "onBlur",
        values: initialData as ArticleBody
    })

    // Mutation Function for the mode
    let mutationFn: (formData: FormData) => Promise<FetchResponse>
    if (mode === "create") {
        mutationFn = (formData) => createArticle(formData)
    } else {
        mutationFn = (formData) => updateArticle(initialData!.id, formData)
    }

    // Mutation
    const { mutate, isLoading } = useMutation({
        mutationFn,
        onSuccess: () => {
            router.replace('/admin/articles')
        },
        onError: (error: AxiosError<FetchError<ArticleBody>>) => {
            // Field Error
            if (error.response?.data?.issues) {
                const issues = error.response?.data?.issues
                for (let key in issues) {
                    const errors = issues[key as keyof ArticleBody]?._errors
                    if (errors && errors.length > 0) {
                        setError(key as keyof ArticleBody, {
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
    const onSubmit: SubmitHandler<ArticleBody> = (data) => {
        // FormData is necessary for fileupload
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value || typeof value === "string") {
                formData.append(key, value);
            }
        });

        mutate(formData)
    }

    // Set the slugified title as the slug
    const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue("slug", slugify(e.target.value, {
            strict: true,
            lower: true,
        }))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Input id="title" label="Title" {...register("title", { onChange: titleChangeHandler })} required error={errors?.title?.message?.toString()} />
            <MDXEditorAdmin name="content" label="Content" control={control} error={errors?.content?.message?.toString()} />
            <Input id="lead" label="Lead" {...register("lead")} error={errors?.lead?.message?.toString()} />
            <ImageInput id="image" label="Image" defaultImagePath={initialData?.thumbnail} {...register("image")} error={errors?.image?.message?.toString()} />
            <Input id="slug" label="Slug" {...register("slug")} required error={errors?.slug?.message?.toString()} />
            <div className="flex items-center gap-2 mt-4">
                <Button disabled={isLoading} type="submit">{isLoading ? 'Loading...' : 'Save Article'}</Button>
                <Button variant="light" outline as={Link} href="/admin/articles">Cancel</Button>
            </div>
            {errors?.root?.serverError && <p className="font-medium text-red-600 my-4">{errors.root?.serverError.message}</p>}
        </form>
    )
}

export default ArticlesForm