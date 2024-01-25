import { z } from 'zod'

export const shareInvoiceSchema = z.object({
	email: z.string().email(),
	consent: z.coerce.boolean().refine(bool => bool === true)
})

export const getShareInvoiceSchema = (dict: any) => {
	const shareInvoiceSchema = z.object({
		email: z.string().email({message: dict.schema["invalid_email"]}),
		consent: z.coerce.boolean().refine(bool => bool === true, {
					message: dict.schema["consent"]
				})
	})

	return shareInvoiceSchema
}

export type TShareInvoiceSchema = z.infer<typeof shareInvoiceSchema>