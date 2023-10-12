import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(req) { },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                const path = req.nextUrl.pathname

                // If the token is missing while trying to reach the admin page redirect to login
                if ((path.startsWith('/admin') || path.startsWith('/changepassword')) && token === null) {
                    return false
                }

                return true
            }
        }
    }
)