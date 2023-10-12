import { ComponentPropsWithoutRef, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

export type ButtonVariant = "primary" | "danger" | "warning" | "light"

type ButtonProps<E extends ElementType> = {
    as?: E,
    outline?: boolean,
    variant?: ButtonVariant,
} & Omit<ComponentPropsWithoutRef<E>, "as" | "variant">

const Button = <E extends ElementType>({ as, variant = "primary", outline = false, className, children, ...restProps }: ButtonProps<E>) => {
    const Element = as || "button"

    let variantClassName = ""
    switch (variant) {
        case "primary":
            variantClassName = twMerge(
                "border-emerald-600",
                clsx({
                    "bg-transparent disabled:bg-slate-200/60 hover:bg-emerald-600 text-emerald-600 hover:text-white ": outline,
                    "bg-emerald-600 disabled:bg-emerald-600/60 hover:bg-emerald-700 text-white": !outline
                }))
            break;
        case "danger":
            variantClassName = twMerge(
                "border-red-600",
                clsx({
                    "bg-transparent disabled:bg-slate-200/60 hover:bg-red-600 text-red-600 hover:text-white ": outline,
                    "bg-red-600 disabled:bg-red-600/60 hover:bg-red-700 text-white": !outline
                }))
            break;
        case "warning":
            variantClassName = twMerge(
                "border-yellow-600",
                clsx({
                    "bg-transparent disabled:bg-slate-200/60 hover:bg-yellow-600 text-yellow-600 hover:text-white ": outline,
                    "bg-yellow-600 disabled:bg-yellow-600/60 hover:bg-yellow-700 text-white": !outline
                }))
            break;
        case "light":
            variantClassName = twMerge(
                "border-slate-600",
                clsx({
                    "bg-transparent disabled:bg-neutral-200/60 hover:bg-neutral-600 text-neutral-600 hover:text-white ": outline,
                    "bg-neutral-600 disabled:bg-neutral-600/60 hover:bg-neutral-700 text-white": !outline
                }))
            break;
    }

    return (
        <Element className={twMerge("py-2 px-4 rounded-md border transition-colors text-sm", variantClassName, className)} {...restProps}>{children}</Element>
    )
}

export default Button