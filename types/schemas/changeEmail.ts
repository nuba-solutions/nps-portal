import { z } from 'zod'

export const changeEmailSchema = z.object({
	email: z.string().email({message: "Invalid Email! Make sure you type it correctly."}),
	consent: z.coerce.boolean().refine(bool => bool === true, {
				message: 'You must consent to email change warning.'
			})
})

export type TChangeEmailSchema = z.infer<typeof changeEmailSchema>