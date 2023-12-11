import { z } from 'zod'

export const shareInvoiceSchema = z.object({
	email: z.string().email({message: "Invalid Email! Make sure you type it correctly."}),
	consent: z.coerce.boolean().refine(bool => bool === true, {
				message: 'You must consent to invoice possibly not going to inbox.'
			})
})

export type TShareInvoiceSchema = z.infer<typeof shareInvoiceSchema>