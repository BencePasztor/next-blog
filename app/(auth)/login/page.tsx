import AdminBrand from "@/components/admin/ui/AdminBrand"
import LoginForm from "@/components/admin/login/LoginForm"

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-slate-200 w-full flex items-center justify-center p-4 shadow">
            <div className="rounded-lg bg-white p-4 max-w-xs w-full">
                <AdminBrand className="text-3xl text-center mb-8" />
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage