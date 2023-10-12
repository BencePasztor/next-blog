import { ComponentPropsWithoutRef } from 'react'
import { Table } from '@tanstack/react-table'
import { ChevronFirst, ChevronLeft, ChevronRight, ChevronLast } from 'lucide-react'
import { getPageArray } from '@/utils/pageUtils'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

type PageButtonProps = {
    active?: boolean
} & ComponentPropsWithoutRef<"button">

type TablePaginationProps = {
    pageIndex: number,
    table: Table<any>
}

const PageButton = ({ active = false, children, disabled, ...restProps }: PageButtonProps) => {
    return (
        <button className={twMerge(
            "text-sm px-3 py-2 rounded border",
            clsx({
                "bg-emerald-600 text-white": active,
                "disabled:bg-slate-200/40 hover:bg-emerald-600/20 transition-colors disabled:cursor-not-allowed": !active
            })
        )} disabled={disabled || active} {...restProps}>{children}</button>
    )
}

const TablePagination = ({ pageIndex, table }: TablePaginationProps) => {

    const pageArray = getPageArray(pageIndex, table.getPageOptions(), 2)

    return (
        <div className="my-8 flex justify-center gap-1">
            {/* First Page */}
            <PageButton
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
            >
                <ChevronFirst size="14px" />
            </PageButton>

            {/* Prev Page */}
            <PageButton
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                <ChevronLeft size="14px" />
            </PageButton>

            {/* Page Numbers */}
            {pageArray.map(page => (
                <PageButton
                    key={page}
                    onClick={() => table.setPageIndex(page)}
                    active={page === pageIndex}
                >
                    {page + 1}
                </PageButton>
            ))}

            {/* Next Page */}
            <PageButton
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                <ChevronRight size="14px" />
            </PageButton>

            {/* Last Page */}
            <PageButton
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
            >
                <ChevronLast size="14px" />
            </PageButton>
        </div>
    )
}

export default TablePagination