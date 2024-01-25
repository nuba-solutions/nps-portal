import { z } from 'zod'

export const changeEmailSchema = z.object({
	email: z.string().email(),
	consent: z.coerce.boolean().refine(bool => bool === true)
})

export const getChangeEmailSchema = (dict: any) => {
	const changeEmailSchema = z.object({
		email: z.string().email({message: dict.schema["invalid_email"]}),
		consent: z.coerce.boolean().refine(bool => bool === true, {
					message: dict.schema["consent"]
				})
	})

	return changeEmailSchema
}

export type TChangeEmailSchema = z.infer<typeof changeEmailSchema>