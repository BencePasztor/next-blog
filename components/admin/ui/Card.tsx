import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type CardProps = {
    className?: string,
    children?: ReactNode
}

const Card = ({ className, children }: CardProps) => {
    return (
        <div className={twMerge("bg-white rounded-lg shadow p-4 w-full h-full", className)}>{children}</div>
    )
}

export default Card