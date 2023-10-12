'use client'

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    PaginationState
} from '@tanstack/react-table'
import { useQuery } from "@tanstack/react-query"
import { useState, useMemo } from "react"
import TablePagination from './TablePagination'
import Spinner from "@/components/common/ui/Spinner"
import { ColumnDef } from '@tanstack/react-table'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

type PaginatedResponse = {
    data: any[],
    pageCount: number
}

type TableProps<T extends PaginatedResponse, D> = {
    itemsPerPage: number,
    columns: ColumnDef<D, any>[],
    queryKeyPartial: string,
    queryFn: (pageIndex: number, pageSize: number) => T | Promise<T>
}

const Table = <T extends PaginatedResponse, D>({ itemsPerPage, columns, queryKeyPartial, queryFn }: TableProps<T, D>) => {

    // PaginationState
    const [{ pageIndex, pageSize }, setPagination] =
        useState<PaginationState>({
            pageIndex: 0,
            pageSize: itemsPerPage,
        })

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )

    // Query for table data
    const { data, isError, isLoading, isSuccess, isFetching } = useQuery({
        queryKey: [queryKeyPartial, { pageIndex, pageSize }],
        queryFn: () => queryFn(pageIndex, pageSize),
        onSuccess: (data) => {
            // If there is no data on the current page, set the pageIndex to the previous page
            if (data.data.length === 0) {
                setPagination(prevState => {
                    return { ...prevState, pageIndex: Math.max(data.pageCount - 1, 0) }
                })
            }
        },
        keepPreviousData: true
    })

    // Table
    const table = useReactTable({
        data: data?.data ?? [],
        pageCount: data?.pageCount ?? -1,
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
        columns,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
    })

    if (isError) {
        return <p className="font-semibold text-red-600 px-4">An unknown error occured.</p>
    }

    if (isLoading) {
        return (
            <div className="px-4">
                <Spinner />
            </div>
        )
    }

    return (
        <>
            <div className="relative">
                <table className={twMerge("table-auto w-full border-collapse text-left text-sm", clsx({ "animate-pulse": isFetching }))}>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th className="py-4 px-3 border-t" key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td className="py-4 px-3 border-t" key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {table.getRowModel().rows.length === 0 && isSuccess && <p className="text-lg py-4 px-3">There is no data to display...</p>}
                <TablePagination table={table} pageIndex={pageIndex} />
            </div>
        </>
    )
}

export default Table