import { z } from 'zod'

export const signInSchema = z.object({
	client_provider: z.string().refine(value => parseInt(value) > 0),
	email: z.string().email(),
	password: z.string().min(8)
})

export const getSignInSchema = (dict: any) => {
	const { schema: schema_dictionary } = dict.pages.sign_in
	const signInSchema = z.object({
		client_provider: z.string().refine(value => parseInt(value) > 0, { message: schema_dictionary["select_provider"] }),
		email: z.string().email({message: schema_dictionary["invalid_email"]}),
		password: z.string().min(8, schema_dictionary["invalid_password"])
	})

	return signInSchema
}

export type TSignInSchema = z.infer<typeof signInSchema>