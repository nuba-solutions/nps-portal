"use client"

import React, { Dispatch, SetStateAction } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getShareInvoiceSchema, TShareInvoiceSchema } from '@/types/schemas/shareInvoice'
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
	dict: any
}

const ShareInvoiceForm = ({setIsShareInvoiceModalOpen, invoiceData, dict: share_invoice_modal_dictionary}: TShareInvoiceFormProps) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<TShareInvoiceSchema>({
		resolver: zodResolver(getShareInvoiceSchema(share_invoice_modal_dictionary))
	})

	const onSubmit = async (data: TShareInvoiceSchema) => {
		const shareInvoiceData = await axios.post('/api/emails', {
			email: data.email,
			invoiceNumber: invoiceData.number,
			invoiceLink: invoiceData.hosted_invoice_url,
			invoiceAmount: formatAmountForDisplay(invoiceData.amount_due as number / 100, "usd"),
			dict: share_invoice_modal_dictionary.email_content,
			subject: {
				prefix: share_invoice_modal_dictionary.email_content["email_subject_prefix"],
				suffix: share_invoice_modal_dictionary.email_content["email_subject_suffix"]
			}
		})

		if (!shareInvoiceData?.data) {
			setError("root", {
				type: 'server',
				message: share_invoice_modal_dictionary.form["share_error"]
			})
			notify.error({ text: share_invoice_modal_dictionary.form.notify["share_error"] })
			return
		}

		if (shareInvoiceData.status === 200) {
			notify.success({ text: share_invoice_modal_dictionary.form.notify["share_success"] })
		} else {
			notify.error({ text: share_invoice_modal_dictionary.form.notify["share_error"] })
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
					label={share_invoice_modal_dictionary.form["email_label"]}
					error={errors.email}
					placeholder={share_invoice_modal_dictionary.form["email_placeholder"]}
					register={register}
				/>
			</InputGroup>
			{
				errors.email ? (
					<p className='text-red-500 mt-2 leading-4'>{`${errors.email.message}`}</p>
				) : null
			}
			<InputGroup inline reverse leading className='mt-5'>
				<Checkbox
					id='share-invoice-checkbox'
					name="consent"
					register={register}
					label={share_invoice_modal_dictionary.form["consent_label"]}
				/>
			</InputGroup>
			{
				errors.consent ? (
					<p className='text-red-500 mt-2 leading-4'>{`${errors.consent.message}`}</p>
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
                    {share_invoice_modal_dictionary.form["cancel_button"]}
                </Button>
                <Button
                    variant='info'
                    className="w-full md:w-fit"
					disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <AiOutlineLoading3Quarters className="spinner"/>
                            {share_invoice_modal_dictionary.form["confirm_button_submitting"]}
                        </>
                    ) : (
                        <>
                            <IoShare/>
                            {share_invoice_modal_dictionary.form["confirm_button_default"]}
                        </>
                        )
                    }
                </Button>
            </div>
			{
				errors.root ? (
					<p className='text-red-500 mt-6 bg-red-500/20 py-4 px-6 rounded-lg text-center leading-4'>{`${errors.root.message}`}</p>
				) : null
			}
		</form>
	)
}

export default ShareInvoiceForm