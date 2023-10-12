import { twMerge } from "tailwind-merge"

const Spinner = ({ className }: { className?: string }) => {
    return (
        <div className={twMerge("rounded-full border-2 border-emerald-600 border-r-transparent animate-spin w-8 aspect-square", className)}></div>
    )
}

export default Spinner