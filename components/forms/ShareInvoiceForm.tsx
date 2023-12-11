"use client"

import React, { Dispatch, SetStateAction } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { shareInvoiceSchema, TShareInvoiceSchema } from '@/types/schemas/shareInvoice'
import { IoShare } from 'react-icons/io5'
import axios from 'axios'
import Stripe from 'stripe'
import notify from '@/utils/notify'
import { formatAmountForDisplay } from '@/utils/stripe-helpers'
import Button from '@/components/ui/buttons/Button'
import InputGroup from '@/components/ui/inputs/InputGroup'
import Input from '@/components/ui/inputs/Input'
import Checkbox from '../ui/inputs/Checkbox'

type TShareInvoiceFormProps = {
	invoiceData: Partial<Stripe.Invoice>
    setIsShareInvoiceModalOpen: Dispatch<SetStateAction<boolean>>
}

const ShareInvoiceForm = ({setIsShareInvoiceModalOpen, invoiceData}: TShareInvoiceFormProps) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<TShareInvoiceSchema>({
		resolver: zodResolver(shareInvoiceSchema)
	})

	const onSubmit = async (data: TShareInvoiceSchema) => {
		const shareInvoiceData = await axios.post('/api/emails', {
			email: data.email,
			invoiceNumber: invoiceData.number,
			invoiceLink: invoiceData.hosted_invoice_url,
			invoiceAmount: formatAmountForDisplay(invoiceData.amount_due as number / 100, "usd")
		})

		if (!shareInvoiceData?.data) {
			setError("root", {
				type: 'server',
				message: 'Could not share invoice!'
			})
			notify.error({ text: "Could not share invoice!" })
			return
		}

		if (shareInvoiceData.status === 200) {
			notify.success({ text: "Invoice shared successfully!" })
		} else {
			notify.error({ text: "Could not share invoice!" })
		}

		setIsShareInvoiceModalOpen(false)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
		>
            <hr className='my-4 border border-slate-300 dark:border-slate-600'/>
			<InputGroup className='mt-6'>
				<Input
					type="email"
					id="share-invoice-email"
					name="email"
					label="Recipient's Email"
					error={errors.email}
					placeholder='email@example.com'
					register={register}
				/>
			</InputGroup>
			{
				errors.email ? (
					<p className='text-red-500 mt-2'>{`${errors.email.message}`}</p>
				) : null
			}
			<InputGroup inline reverse leading className='mt-5'>
				<Checkbox
					id='share-invoice-checkbox'
					name="consent"
					register={register}
					label={`I am aware that this email may land in the <br/>
					<span className='font-bold'>spam / junk</span> box and I will notify the recipient.`}
				/>
			</InputGroup>
			{
				errors.consent ? (
					<p className='text-red-500 mt-2'>{`${errors.consent.message}`}</p>
				) : null
			}

            <hr className='my-4 border border-slate-300 dark:border-slate-600'/>
            <div className="mt-4 flex flex-col-reverse gap-4 md:gap-0 md:flex-row items-center justify-between">
                <Button
					outlined
                    className="w-full md:w-fit"
                    onClick={(e) => {
                        e.preventDefault()
                        setIsShareInvoiceModalOpen(false)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant='info'
                    className="w-full md:w-fit"
					disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <AiOutlineLoading3Quarters className="spinner"/>
                            Sharing
                        </>
                    ) : (
                        <>
                            <IoShare/>
                            Confirm Share Invoice
                        </>
                        )
                    }
                </Button>
            </div>
			{
				errors.root ? (
					<p className='text-red-500 mt-6 bg-red-500/20 py-4 px-6 rounded-lg text-center'>{`${errors.root.message}`}</p>
				) : null
			}
		</form>
	)
}

export default ShareInvoiceForm