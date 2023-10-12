import { twMerge } from "tailwind-merge"

const AdminBrand = ({ className }: { className?: string }) => {
    return <div className={twMerge("text-2xl font-extrabold", className)}>NEXT <span className="text-emerald-600">Admin</span></div>
}

export default AdminBrand