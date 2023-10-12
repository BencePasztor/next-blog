'use client'

import AdminProviders from "./AdminProviders"
import AdminLayoutInner from "./AdminLayoutInner"

// The AdminLayoutInner and AdminLayout separation is needed to make the layout.tsx a server component
// while keeping these components server components

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <AdminProviders>
            <AdminLayoutInner>{children}</AdminLayoutInner>
        </AdminProviders>
    )
}
