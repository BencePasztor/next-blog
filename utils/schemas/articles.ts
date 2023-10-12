import z from "zod"

export const articleBodySchema = z.object({
    title: z.string().min(1, "Title must not be empty").max(191),
    image: z.custom<FileList | File>()
        .nullable()
        .transform((value) => {
            // If it' falsy or an instance of File, return the value
            if (!value || value instanceof File) {
                return value
            }

            // If it's a FileList, return the file
            if (value instanceof FileList && value.length > 0) {
                return value.item(0)
            }

            return null
        })
        .superRefine((file, context) => {
            if (file) {
                if (file.size >= 10 * 1024 * 1024) {
                    context.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "The thumbnail must be a maximum of 10MB,",
                    });
                    return z.NEVER
                }
                if (!file.type?.startsWith("image")) {
                    context.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Only image files are allowed.",
                    });
                }
            }
        }),
    content: z.string({required_error: "Content must not be empty"}),
    lead: z.string().max(191).nullable(),
    slug: z.string().trim().min(1, "Slug must not be empty").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug").max(191)
})

export const articleBodySchemaWithId = articleBodySchema.extend({
    id: z.number()
})

export type ArticleBody = z.infer<typeof articleBodySchema>

export type ArticleBodyWithId = z.infer<typeof articleBodySchemaWithId>