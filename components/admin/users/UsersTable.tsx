'use client'

import {
    createColumnHelper,
} from '@tanstack/react-table'
import { User } from '@prisma/client'
import { getUsersPaginated } from "@/utils/fetch/users"
import UsersRowActions from "./UsersRowActions"
import Table from "../ui/table/Table"

const columnHelper = createColumnHelper<User>()

const columns = [

    columnHelper.accessor("name", {
        header: "Name",
        cell: info => info.getValue()
    }),
    columnHelper.accessor("email", {
        header: "Email",
        cell: info => info.getValue()
    }),

    columnHelper.display({
        id: "actions",
        cell: props => <UsersRowActions name={props.row.original.name} id={props.row.original.id} />
    })
]

const UsersTable = () => {
    return (
        <Table itemsPerPage={10} columns={columns} queryKeyPartial="users-admin" queryFn={getUsersPaginated} />
    )
}

export default UsersTable