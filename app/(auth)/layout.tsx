import React from 'react'
import AdminBrand from '@/components/admin/ui/AdminBrand'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-slate-200 w-full flex items-center justify-center p-4 shadow">
            <div className="rounded-lg bg-white p-4 max-w-xs w-full">
                <AdminBrand className="text-3xl text-center mb-8" />
                {children}
            </div>
        </div>
    )
}

export default AuthLayout