import AdminLayoutWrapper from "@/components/admin/layout/AdminLayoutWrapper"
import { redirectToPasswordChangeOnFirstLogin } from "@/utils/authUtils"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {

    await redirectToPasswordChangeOnFirstLogin()

    return (
        <>
            <div id="modal-portal"></div>
            <AdminLayoutWrapper>
                {children}
            </AdminLayoutWrapper>
        </>
    )
}

export const revalidate = 0
export const dynamic = 'force-dynamic'