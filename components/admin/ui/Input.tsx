import { ComponentProps, forwardRef } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type InputProps = {
    id: string,
    label: string,
    error?: string
} & ComponentProps<"input">

const Input = forwardRef<HTMLInputElement, InputProps>(({ id, label, error, required, ...restProps }, ref) => {

    const labelClasses = twMerge(
        "font-medium",
        clsx({
            "after:text-red-600 after:content-['_*']": required
        })
    )

    const inputClasses = twMerge(
        "px-3 py-2 border border-slate-300 rounded-lg",
        clsx({
            "outline outline-red-600 outline-1 focus:outline-2": error,
            "outline-emerald-600": !error
        })
    )

    return (
        <div className="flex flex-col gap-2 text-sm mb-4">
            <label className={labelClasses} htmlFor={id}>{label}</label>
            <input id={id} className={inputClasses} ref={ref} {...restProps} />
            {error && <p className="font-medium text-red-600">{error}</p>}
        </div>
    )
})

export default Input