import AdminLayout from "@/components/admin/layout/AdminLayout"
import { redirectToPasswordChangeOnFirstLogin } from "@/utils/authUtils"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    // Guess what this does!
    await redirectToPasswordChangeOnFirstLogin()

    return (
        <>
            <div id="modal-portal"></div>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    )
}

export const revalidate = 0
export const dynamic = 'force-dynamic'