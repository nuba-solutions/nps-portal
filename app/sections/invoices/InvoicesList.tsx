"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getInvoices } from '@/query_functions/invoices'
import Stripe from 'stripe'
import InvoiceCard from '@/components/ui/cards/InvoiceCard'

type TInvoiceListProps = {
    status: string
}

const InvoicesList = ({status}: TInvoiceListProps) => {
    const { data: invoices, error, isError, isPending } = useQuery({
        queryKey: ['invoices'],
        queryFn: () => getInvoices(status),
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    return invoices && invoices.length > 0 ? (
        <ul className='grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4'>
            {
                invoices.map((invoice: Stripe.Invoice) => (
                    <li key={invoice.id} className='w-full'>
                        <InvoiceCard invoice={invoice}/>
                    </li>
                ))
            }
        </ul>
    ) : (
        <div>
            <h2 className='text-xl font-semibold'>Good news!</h2>
            <p>You have no open charges / invoices to pay at this time.</p>
        </div>
    )
}

export default InvoicesList