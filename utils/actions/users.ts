import { db } from "@/lib/db"
import { User } from "@prisma/client"

export const getUserById = async (id: number): Promise<User> => {

    const user = await db.user.findUniqueOrThrow({
        where: {
            id
        }
    })

    return user
}