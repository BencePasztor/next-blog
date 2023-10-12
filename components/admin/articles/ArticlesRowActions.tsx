import React from 'react'
import { FileEdit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteArticle } from '@/utils/fetch/articles'
import { useModal } from '@/providers/admin/ModalProvider'

const ArticlesRowActions = ({ id, title, slug }: { id: number, title: string, slug: string }) => {

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: (id: number) => deleteArticle(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles-admin"] })
        }
    })

    const { openModal } = useModal()

    const deleteHandler = async (id: number, title: string) => {
        openModal({
            title: "Delete",
            body: (
                <>
                    <p>Are you sure you want to delete this article?</p>
                    <p className="font-bold">{title}</p>
                </>
            ),
            confirmText: "Delete",
            confirmVariant: "danger",
            confirmCallback: () => { mutate(id) }
        })
    }

    return (
        <div className="flex items-center justify-end gap-4 text-sm font-bold">
            <Link href={`/articles/${slug}`} className="flex items-center gap-1 text-neutral-500"><Eye size="1.25rem" />View</Link>
            <Link className="flex items-center gap-1 text-yellow-500" href={`/admin/articles/${id}`}><FileEdit size="1.25rem" />Edit</Link>
            <button onClick={() => { deleteHandler(id, title) }} className="flex items-center gap-1 text-red-500"><Trash2 size="1.25rem" />Delete</button>
        </div>
    )
}

export default ArticlesRowActions