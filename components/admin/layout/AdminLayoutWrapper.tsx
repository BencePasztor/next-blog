'use client'

import AdminProviders from "./AdminProviders"
import AdminLayoutInner from "./AdminLayoutInner"

// The AdminLayout and AdminLayoutWrapper separation is needed to make the layout.tsx a server component
// while keeping these components client components

export default function AdminLayoutWrapper({
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
