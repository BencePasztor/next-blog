import Card from "@/components/admin/ui/Card"
import UsersUpdateForm from "@/components/admin/users/UsersUpdateForm"
import { getUserById } from '@/utils/actions/users'
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Update User',
}

const UpdateUser = async ({ params }: { params: { id: string } }) => {

    const initialData = await getUserById(parseInt(params.id))

    return (
        <Card className="px-4">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8 mt-4">
                <h1 className="font-bold text-3xl">Update User</h1>
            </div>
            <UsersUpdateForm initialData={initialData} />
        </Card>
    )
}

export default UpdateUser

export const revalidate = 0