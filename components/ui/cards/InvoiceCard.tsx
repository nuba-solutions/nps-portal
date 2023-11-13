"use client"

import { formatAmountForDisplay } from '@/lib/stripe-helpers'
import Link from 'next/link'
import { IoDocumentText, IoInformation, IoInformationCircle, IoTime, IoWallet } from 'react-icons/io5'
import { differenceInDays, format } from 'date-fns'
import Stripe from 'stripe'
import { useRef } from 'react'
import useComponentVisible from '@/hooks/useClickOutside'

type TInvoiceCardProps = {
    invoice: Stripe.Invoice
}

const InvoiceCard = ({invoice}: TInvoiceCardProps) => {
    if (!invoice) return null

	const invoicePastDueCardRef = useRef<any>()
	const {
		isComponentVisible,
		setIsComponentVisible
	} = useComponentVisible(false, invoicePastDueCardRef);

	let statusColor = '';
	switch (invoice.status) {
		case 'draft':
			statusColor = 'bg-orange-400 text-white'
			break
		case 'open':
			statusColor = 'bg-red-500 text-white'
			break
		case 'paid':
			statusColor = 'bg-green-500 text-white'
			break
		case 'uncollectible':
			statusColor = 'bg-purple-500 text-white'
			break
		default:
			statusColor = 'bg-slate-300 dark:bg-slate-500'
			break
	}

    return (
		<div className='relative bg-white dark:bg-slate-800 rounded-lg md:rounded-xl w-full shadow-xl overflow-clip pb-4'>
			<div className={`absolute top-0 right-2 min-w-fit px-2 h-8 w-16 md:h-10 md:w-20 rounded-b-xl flex items-center justify-center shadow-xl capitalize font-semibold ${statusColor}`}>
				{invoice.status}
			</div>
			<div className='bg-slate-200 dark:bg-slate-700 px-4 py-2 lg:py-3 flex flex-col border-b border-b-slate-300 dark:border-b-slate-600'>
				<p className='font-semibold text-base'>Invoice #:</p>
				<p className='text-slate-600 dark:text-slate-300'>{invoice.number || 'Invoice number missing'}</p>
			</div>

			<div className='px-4'>
				<div className='pt-4 flex justify-between items-center'>
					<div className="flex flex-col">
						<p className='font-semibold'>Customer</p>
						<p className='text-slate-500 dark:text-slate-400'>Invoice issued for</p>
					</div>
					<div className="flex flex-col items-end">
						<strong>{invoice.customer_name}</strong>
						<p className='text-slate-500 dark:text-slate-400'>{invoice.customer_email}</p>
					</div>
				</div>

				<hr className="h-px my-4 bg-gray-200 border-0 dark:bg-slate-700"></hr>

				<div className='flex justify-between items-center'>
					<p className='font-semibold'>Provider</p>
					<p>{invoice.metadata?.provider || invoice.account_name}</p>
				</div>

				<hr className="h-px my-4 bg-gray-200 border-0 dark:bg-slate-700"></hr>

				<div className='flex justify-between items-center'>
					<div className='flex flex-col'>
						<p className='font-semibold'>Description</p>
						<p className='text-slate-500 dark:text-slate-400'>{invoice.description || 'Regular Charges'}</p>
					</div>

					<div className='flex flex-col text-right'>
						<p className='text-slate-500 dark:text-slate-400'>Total</p>
						<div className='text-lg font-semibold'>
						{
							invoice.amount_due ? formatAmountForDisplay(invoice?.amount_due / 100, "usd") : (
								<span className='text-sm'>Not Available</span>
							)
						}
						</div>
					</div>
				</div>

				<hr className="h-px my-4 bg-gray-200 border-0 dark:bg-slate-700"></hr>

				{
					invoice.lines.data.length > 0 ? (
						<>
							{
								invoice.lines.data[0].description ? (
									<>
										<p className='font-semibold mb-2'>Charge Details</p>
										<ul>
											{
												invoice.lines.data.map((item: any ) => (
													<li className='flex items-center justify-between my-2' key={item.id}>
														<p className='text-slate-500 dark:text-slate-400 truncate max-w-[150px] sm:max-w-none'>{item.description}</p>
														<p className='font-semibold'>{formatAmountForDisplay(parseInt(item.amount) / 100, "usd")}</p>
													</li>
												))
											}
										</ul>
										<hr className="h-px my-4 bg-gray-200 border-0 dark:bg-slate-700"></hr>
									</>
								) : null
							}
						</>
					) : (
						null
					)
				}

				<div className='flex items-center justify-between'>
					<div className="flex flex-col">
						<strong className='font-semibold'>Created date</strong>
						{
							invoice.due_date && invoice.status === "open" ? (
								<p className='text-slate-500 dark:text-slate-400'>
									This invoice has
									<span className='mx-1'>{differenceInDays(new Date(invoice?.due_date * 1000), new Date(invoice?.created * 1000))}</span>
									days to be paid.
								</p>
							) : null
						}
					</div>
					<p>{format(new Date(invoice?.created * 1000), `MMMM dd, yyyy`)}</p>
				</div>
				<hr className="h-px my-4 bg-gray-200 border-0 dark:bg-slate-700"></hr>

		 		<div className='mt-2 mb-4'>
					{
						invoice.status !== 'paid' && invoice.due_date ? (
							<div className='flex items-center justify-between'>
								<div className="flex flex-col">
									<strong className='font-semibold'>Due date</strong>
									<p className='text-slate-500 dark:text-slate-400'>
										Last day to effectively make a payment.
									</p>
								</div>
								<div className='flex items-center gap-2 cursor-pointer' onClick={setIsComponentVisible}>
									<IoInformationCircle className="text-base"/>
									{ isComponentVisible ? (
											<div ref={invoicePastDueCardRef} className='cursor-default absolute right-3 bottom-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-700 w-[250px] px-5 py-5 shadow-2xl rounded-2xl'>
												<p className="text-base font-bold dark:text-white leading-5">Past payment due date</p>
												<hr className="h-px my-4 bg-gray-200 border-0 dark:bg-slate-600"></hr>
												<p className="text-slate-500 dark:text-slate-300 text-sm">This invoice is past the payment due date. Make sure the payment is done as soon as possible to avoid any issues with your products or service provider.</p>
											</div>
										) : (
											null
										)
									}
									<p className={`${invoice.due_date < Math.floor(new Date().getTime() / 1000) ? 'text-red-500 dark:text-red-400 font-semibold' : ''}`}>
										{
											invoice.due_date ? (
												format(new Date(invoice?.due_date * 1000), `MMMM dd, yyyy`)
											) : ''
										}
									</p>
								</div>
							</div>
						) : (
							<>
								<div className='flex items-center justify-between'>
									<p className='font-semibold'>Paid date: </p>
									<p>
										{
											invoice.status_transitions ? (
												invoice?.status_transitions.paid_at && format(new Date(invoice?.status_transitions.paid_at * 1000), `MMMM dd, yyyy`)
											) : null
										}
									</p>
								</div>
								{
									invoice.receipt_number ? (
										<>
											<hr className="h-px my-4 bg-gray-200 border-0 dark:bg-slate-700"></hr>
											<div className='flex items-center justify-between my-2'>
												<p className='font-semibold'>Receipt Number:</p>
												<p>{invoice.receipt_number}</p>
											</div>
											<hr className="h-px my-4 bg-gray-200 border-0 dark:bg-slate-700"></hr>
										</>
									) : null
								}
							</>
						)
					}
				</div>

		        {
                    invoice.status === 'open' ? (
						<>
							<hr className="h-px my-4 bg-gray-200 border-0 dark:bg-slate-700"></hr>
							<Link
								href={`${invoice.hosted_invoice_url}`}
								target='_blank'
								className={`btn btn-primary w-full md:w-fit ml-auto`}
							>
								<IoWallet/>
								Pay Invoice
							</Link>
						</>
					) : null
				}
			</div>
		</div>
	)
}

export default InvoiceCard