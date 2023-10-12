import Card from "@/components/admin/ui/Card"
import UsersCreateForm from "@/components/admin/users/UsersCreateForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Create User',
}

const CreateUser = () => {

    return (
        <Card className="px-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 mb-8">
                <h1 className="text-3xl font-bold">Create User</h1>
            </div>
            <UsersCreateForm />
        </Card>
    )
}

export default CreateUser