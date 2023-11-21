import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import format from "date-fns/format";
import Link from "next/link";
import { IoClipboard, IoEllipsisHorizontal, IoEllipsisVertical, IoShare, IoWallet } from "react-icons/io5";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import Stripe from "stripe";
import useComponentVisible from "@/hooks/useClickOutside";
import { useRef } from "react";
import notify from "@/utils/notify";

export const renderInvoiceNumber = (invoiceNumber: string) => {
    return (
        <div className="flex items-center justify-between gap-4">
            <p>{invoiceNumber}</p>
            <IoClipboard
                className="cursor-pointer text-slate-400 hover:text-slate-500"
                title="Copy to clipboard"
                onClick={() => {
                    navigator.clipboard.writeText(invoiceNumber)
                    notify.success({text: 'Copied to clipboard'})
                }}
            />
        </div>
    )
}

export const renderInvoiceDetails = (row: Partial<Stripe.Invoice>) => {
    const rowDetailsRef = useRef<any>(null)
	const {
		isComponentVisible,
		setIsComponentVisible
	} = useComponentVisible(false, rowDetailsRef);

    return (
        <div className="flex items-center justify-center">
            {
                row.lines?.data && row.lines?.data.length > 0 ? (
                    <>
                        <button className="text-xs font-semibold p-2 pr-3 flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600"
                            onClick={setIsComponentVisible}
                        >
                            <IoEllipsisVertical />
                            Expand Details
                        </button>

                        {
                            isComponentVisible ? (
                                <div
                                    ref={rowDetailsRef}
                                    className={`absolute z-30 right-10 md:right-20 xl:right-[unset] w-fit min-w-[300px] bg-white dark:bg-slate-700 rounded-lg shadow-xl border border-slate-300 dark:border-slate-500 overflow-clip`}
                                >
                                    <div className="p-4">
                                        <p className="font-semibold">Charges Details</p>
                                        <p className="text-xs opacity-75"># {row.number}</p>
                                    </div>
                                    <hr className="h-px border-gray-200 dark:border-slate-500"/>
                                    <ul className="px-4">
                                        {
                                            row.lines?.data.map((item: Stripe.InvoiceLineItem ) => (
                                                item.description ? (
                                                    <li className='flex items-center justify-between gap-3 my-2' key={item.id}>
                                                        <p className='text-slate-500 dark:text-slate-400 truncate max-w-[150px] sm:max-w-none'>{item.description}</p>
                                                        <p className='font-semibold'>{formatAmountForDisplay(item.amount as number / 100, "usd")}</p>
                                                    </li>
                                                ) : null
                                            ))
                                        }
                                    </ul>
                                    <hr className="h-px border-gray-200 dark:border-slate-500"/>
                                    <div className='flex items-center justify-between gap-3 my-2 px-4'>
                                        <p className='truncate max-w-[150px] sm:max-w-none'>Total</p>
                                        <p className='font-semibold'>{formatAmountForDisplay(row.total as number / 100, "usd")}</p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </>
                ) : null
            }
        </div>
    )
}

export const renderInvoiceStatus = (status: string) => {
    if (!status) return (
        <span>Missing Status</span>
    )

    let statusColorClass = ''
    switch (status) {
        case 'paid':
            statusColorClass = 'bg-green-100 dark:bg-green-200 text-green-700'
            break;
        case 'open':
            statusColorClass = 'bg-red-100 dark:bg-red-200 text-red-700'
            break;
        case 'draft':
            statusColorClass = 'bg-blue-100 dark:bg-blue-200 text-blue-700'
            break;
        case 'void':
            statusColorClass = 'bg-orange-100 dark:bg-orange-200 text-orange-700'
            break;
        case 'uncollectible':
            statusColorClass = 'bg-purple-100 dark:bg-purple-200 text-purple-600'
            break;
    }

    return (
        <p className={`capitalize text-xs font-semibold py-1 w-fit px-2 rounded-md ${statusColorClass}`}>{status}</p>
    )
}

export const renderTableDollarCell = (amount: number) => {
    return (
        <div className="flex">
            <span className='ml-auto'>
                {formatAmountForDisplay(amount / 100, "usd")}
            </span>
        </div>
    )
}

export const renderTableDateCell = (date: number, mask: string) => {
    return (
        <span>{format(new Date(date * 1000), mask)}</span>
    )
}

export const renderInvoiceActions = (row: Partial<Stripe.Invoice>) => {
    const rowActionsRef = useRef<any>(null)
	const {
		isComponentVisible,
		setIsComponentVisible
	} = useComponentVisible(false, rowActionsRef);

    return (
        <div className="flex items-center justify-center">
            <button className="text-xs p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-white hover:dark:bg-slate-600 hover:shadow-lg"
                onClick={setIsComponentVisible}
            >
                <IoEllipsisHorizontal />
            </button>

            {
                isComponentVisible ? (
                    <div
                        ref={rowActionsRef}
                        className={`absolute z-30 right-10 min-w-[250px] bg-white dark:bg-slate-700 rounded-lg shadow-xl border border-slate-300 dark:border-slate-500 overflow-clip`}
                    >
                        <div className="p-4">
                            <p className="font-semibold">Invoice Actions</p>
                            <p className="text-xs opacity-75"># {row.number}</p>
                        </div>
                        <hr className="h-px border-gray-200 dark:border-slate-500"/>
                        <ul>
                            <li className='w-full py-3 px-4 hover:bg-slate-100 dark:hover:bg-slate-800'>
                                <Link
                                    href={`${row.invoice_pdf}`}
                                    className="flex items-center justify-between gap-2 text-sm">
                                    Download Invoice
                                    <BsFileEarmarkPdfFill />
                                </Link>
                            </li>
                            <li className={`w-full py-3 px-4 ${row.status === "open" ? 'hover:bg-slate-100 dark:hover:bg-slate-800' : 'opacity-50 select-none pointer-events-none'}`}>
                                <Link
                                    href={`${row.hosted_invoice_url}`}
                                    target="_blank"
                                    className="flex items-center justify-between gap-2 text-sm">
                                    Pay Invoice
                                    <IoWallet />
                                </Link>
                            </li>
                            <li className={`w-full py-3 px-4 ${row.status === "open" ? 'hover:bg-slate-100 dark:hover:bg-slate-800' : 'opacity-50 select-none pointer-events-none'}`}>
                                <Link
                                    href={``}
                                    className="flex items-center justify-between gap-2 text-sm">
                                    Share Invoice
                                    <IoShare />
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : null
            }
        </div>
    )
}