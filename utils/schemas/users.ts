import z from "zod"

export const userUpdateSchema = z.object({
    name: z.string().min(1, "Name must not be empty").max(191),
})

export type UserUpdateBody = z.infer<typeof userUpdateSchema>

export const userCreateSchema = userUpdateSchema.extend({
    email: z.string().email("Invalid email").max(191),
})

export type UserCreateBody = z.infer<typeof userCreateSchema>

export const userChangePasswordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters long").max(191),
    confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords do not match",
            path: ['confirmPassword']
        })
    }
})

export type UserChangePasswordBody = z.infer<typeof userChangePasswordSchema>