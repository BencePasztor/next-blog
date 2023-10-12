import React from 'react'
import { FileEdit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUser } from '@/utils/fetch/users'
import { useModal } from '@/providers/admin/ModalProvider'

const UsersRowActions = ({ id, name }: { id: number, name: string }) => {

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: (id: number) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users-admin"] })
        }
    })

    const { openModal } = useModal()

    const deleteHandler = async (id: number, name: string) => {
        openModal({
            title: "Delete",
            body: (
                <>
                    <p>Are you sure you want to delete the following user?</p>
                    <p className="font-bold">{name}</p>
                </>
            ),
            confirmText: "Delete",
            confirmVariant: "danger",
            confirmCallback: () => { mutate(id) }
        })
    }

    return (
        <div className="flex items-center justify-end gap-4 text-sm font-bold">
            <Link className="flex items-center gap-1 text-yellow-500" href={`/admin/users/${id}`}><FileEdit size="1.25rem" />Edit</Link>
            <button onClick={() => { deleteHandler(id, name) }} className="flex items-center gap-1 text-red-500"><Trash2 size="1.25rem" />Delete</button>
        </div>
    )
}

export default UsersRowActions