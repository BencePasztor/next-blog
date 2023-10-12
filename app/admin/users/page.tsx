import Card from "@/components/admin/ui/Card"
import UsersTable from "@/components/admin/users/UsersTable"
import Button from "@/components/common/ui/Button"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Users',
}

const Users = () => {

    return (
        <Card className="px-0">
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 mt-4 mb-8">
                <h1 className="text-3xl font-bold">Users</h1>
                <Button href="/admin/users/create" as={Link}>New User</Button>
            </div>
            <UsersTable />
        </Card>
    )
}

export default Users