'use client'

import { ChangeEvent, ComponentProps, forwardRef, useState } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type InputProps = {
    id: string,
    label: string,
    error?: string,
    defaultImagePath?: string | null,
} & Omit<ComponentProps<"input">, "type">

const ImageInput = forwardRef<HTMLInputElement, InputProps>(({ id, label, error, required, defaultImagePath, ...restProps }, ref) => {

    const [imageUrl, setImageUrl] = useState<string | undefined | null>(defaultImagePath)

    const labelClasses = twMerge(
        "font-medium",
        clsx({
            "after:text-red-600 after:content-['_*']": required
        })
    )

    const inputClasses = twMerge(
        "px-3 py-2 border border-slate-300 rounded-lg file:rounded-lg file:bg-emerald-600 file:text-white file:hover:bg-emerald-700 file:transition-colors file:border-0 file:font-semibold file:py-2 file:px-4 file:cursor-pointer",
        clsx({
            "outline outline-red-600 outline-1 focus:outline-2": error,
            "outline-emerald-600": !error
        })
    )

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            setImageUrl(URL.createObjectURL(file))
        }

        if (typeof restProps.onChange === "function") {
            restProps.onChange(e)
        }
    }

    return (
        <div className="flex flex-col gap-2 text-sm mb-4">
            <label className={labelClasses} htmlFor={id}>{label}</label>
            <input {...restProps} onChange={onChangeHandler} type="file" id={id} className={inputClasses} ref={ref}/>
            {error && <p className="font-medium text-red-600">{error}</p>}
            {imageUrl && <img src={imageUrl} className="max-w-xs w-full object-cover" alt="Preview of uploaded image"/>}
        </div>
    )
})

export default ImageInput