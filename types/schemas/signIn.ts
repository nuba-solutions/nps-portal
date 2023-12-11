import { z } from 'zod'

export const signInSchema = z.object({
	client_provider: z.string().refine(value => parseInt(value) > 0, { message: "You must select a provider" }),
	email: z.string().email(),
	password: z.string().min(8, "Password must be at least 8 characters!")
})

export type TSignInSchema = z.infer<typeof signInSchema>