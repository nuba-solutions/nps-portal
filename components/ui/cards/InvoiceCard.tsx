"use client"

import { formatAmountForDisplay } from '@/utils/stripe-helpers'
import { IoInformationCircle, IoShare, IoWallet } from 'react-icons/io5'
import Stripe from 'stripe'
import { useRef, useState } from 'react'
import useComponentVisible from '@/hooks/useClickOutside'
import ShareInvoiceModal from '../modals/ShareInvoiceModal'
import Button from '../buttons/Button'
import { formatLongDateLocale } from '@/utils/date_format_helpers'

type TInvoiceCardProps = {
    invoice: Stripe.Invoice
	dict: any
	lang: any
}

const InvoiceCard = ({invoice, dict, lang}: TInvoiceCardProps) => {
    if (!invoice) return null

	const { invoice_card: invoice_card_dictionary } = dict.pages.open_charges.components

	const invoicePastDueCardRef = useRef<any>()
	const {
		isComponentVisible,
		setIsComponentVisible
	} = useComponentVisible(false, invoicePastDueCardRef);

	const [isShareInvoiceModalOpen, setIsShareInvoiceModalOpen] = useState(false)

    return (
		<>
			<div className='relative bg-white dark:bg-slate-800 rounded-lg md:rounded-xl w-full shadow-xl overflow-clip pb-4'>
				<div className={`absolute top-0 right-2 min-w-fit px-2 h-8 w-16 md:h-10 md:w-20 rounded-b-xl flex items-center justify-center shadow-xl capitalize font-semibold bg-red-500 text-white`}>
					{invoice.status ? invoice_card_dictionary.statuses[invoice.status] : ''}
				</div>
				<div className='bg-slate-200 dark:bg-slate-700 px-4 py-2 lg:py-3 flex flex-col border-b border-b-slate-300 dark:border-b-slate-600'>
					<p className='font-semibold text-base'>{invoice_card_dictionary["invoice_number"]}:</p>
					<p className='text-slate-600 dark:text-slate-300'>{invoice.number || invoice_card_dictionary["invoice_number_missing"]}</p>
				</div>

				<div className='px-4'>
					<div className='pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center'>
						<div className="flex flex-col">
							<p className='font-semibold'>{invoice_card_dictionary["customer"]}</p>
							<p className='text-slate-500 dark:text-slate-400'>{invoice_card_dictionary["issued_for"]}</p>
						</div>
						<div className="flex flex-col mt-2 sm:mt-0 sm:items-end">
							<p className='font-semibold'>{invoice.customer_name}</p>
							<p className='text-slate-500 dark:text-slate-400'>{invoice.customer_email}</p>
						</div>
					</div>

					<hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>

					<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
						<div className="flex flex-col">
							<p className='font-semibold'>{invoice_card_dictionary["provider"]}</p>
							<p className='text-slate-500 dark:text-slate-400'>{invoice_card_dictionary["issued_by"]}</p>
						</div>
						<p>{invoice.metadata?.provider || invoice.account_name}</p>
					</div>

					<hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>

					<div className='flex justify-between items-center'>
						<div className='flex flex-col'>
							<p className='font-semibold'>{invoice_card_dictionary["description"]}</p>
							<p className='text-slate-500 dark:text-slate-400 truncate max-w-[170px] sm:max-w-none'>{invoice.description || invoice_card_dictionary["regular_charges"]}</p>
						</div>

						<div className='flex flex-col text-right'>
							<p className='text-slate-500 dark:text-slate-400'>{invoice_card_dictionary["total"]}</p>
							<div className='text-lg font-semibold'>
							{
								invoice.amount_due ? formatAmountForDisplay(invoice?.amount_due / 100, "usd") : (
									<span className='text-sm'>{invoice_card_dictionary["not_available"]}</span>
								)
							}
							</div>
						</div>
					</div>

					<hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>

					{
						invoice.lines.data.length > 0 ? (
							<>
								{
									invoice.lines.data[0].description ? (
										<>
											<p className='font-semibold mb-2'>{invoice_card_dictionary["charge_details"]}</p>
											<ul>
												{
													invoice.lines.data.map((item: Stripe.InvoiceLineItem ) => (
														<li className='flex items-center justify-between my-2' key={item.id}>
															<p className='text-slate-500 dark:text-slate-400 truncate max-w-[150px] sm:max-w-none'>{item.description}</p>
															<p className='font-semibold'>{formatAmountForDisplay(item.amount as number / 100, "usd")}</p>
														</li>
													))
												}
											</ul>
											<hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>
										</>
									) : null
								}
							</>
						) : (
							null
						)
					}

					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0'>
						<div className="flex flex-col">
							<strong className='font-semibold'>{invoice_card_dictionary["created_date"]}</strong>
							<p className='text-slate-500 dark:text-slate-400'>
								{invoice_card_dictionary["date_warning"]}
							</p>
						</div>
						<p>{formatLongDateLocale(invoice?.created * 1000, lang)}</p>
					</div>
					<hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>

					<div className='mt-2 mb-4'>
						{
							invoice.due_date ? (
								<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0'>
									<div className="flex flex-col">
										<strong className='font-semibold'>{invoice_card_dictionary["due_date"]}</strong>
										<p className='text-slate-500 dark:text-slate-400'>
											{invoice_card_dictionary["last_day_to_pay"]}
										</p>
									</div>
									{
										invoice.due_date && invoice.due_date < Math.floor(new Date().getTime() / 1000) ? (
											<div className='flex items-center gap-2 cursor-pointer whitespace-nowrap' onClick={setIsComponentVisible}>
												<IoInformationCircle className="text-base"/>
												{ isComponentVisible ? (
														<div ref={invoicePastDueCardRef} className='cursor-default z-10 absolute right-3 bottom-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-700 max-w-[280px] px-5 py-5 shadow-2xl rounded-2xl whitespace-normal'>
															<p className="text-base font-bold dark:text-white leading-5">{invoice_card_dictionary["past_due_date"]}</p>
															<hr className="h-px my-3 border-gray-200 dark:border-slate-600"></hr>
															<p className="text-slate-500 dark:text-slate-300 text-sm">{invoice_card_dictionary["past_due_date_text"]}</p>
														</div>
													) : null
												}
												<p className='text-red-500 dark:text-red-400 font-semibold'>{formatLongDateLocale(invoice?.due_date * 1000, lang)}</p>
											</div>
										) : (
											<p>{formatLongDateLocale(invoice?.due_date * 1000, lang)}</p>
										)
									}
								</div>
							) : null
						}
					</div>

					<hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>
					<div className="flex flex-col sm:flex-row items-center gap-4 justify-end">
						<Button
							variant='light'
							onClick={() => setIsShareInvoiceModalOpen(true)}
							className='w-full md:w-fit'
							disabled={!invoice.number}
						>
							<IoShare/>
							{invoice_card_dictionary["share_button"]}
						</Button>
						<Button
							variant='info'
							link={`${invoice.hosted_invoice_url}`}
							target='_blank'
							className='w-full md:w-fit'
							disabled={!invoice.number}
						>
							<IoWallet/>
							{invoice_card_dictionary["pay_button"]}
						</Button>
					</div>
				</div>
			</div>
			<ShareInvoiceModal
                isShareInvoiceModalOpen={isShareInvoiceModalOpen}
                setIsShareInvoiceModalOpen={setIsShareInvoiceModalOpen}
                invoiceData={invoice}
                closeModal={() => setIsShareInvoiceModalOpen(false)}
				dict={dict}
            />
		</>
	)
}

export default InvoiceCard