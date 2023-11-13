"use client"

import InvoiceCard from '@/components/ui/cards/InvoiceCard'
import { getInvoices } from '@/query_functions/invoices'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Stripe from 'stripe'

const InvoicesTable = () => {
    const { data: invoices, error, isError, isPending } = useQuery({
        queryKey: ['all_invoices'],
        queryFn: () => getInvoices(''),
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    if (invoices && invoices.length > 0) {
        return (
            <ul className='grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4'>
                {
                    invoices.map((invoice: Stripe.Invoice) => (
                        <li key={invoice.id} className='w-full'>
                            <InvoiceCard invoice={invoice}/>
                        </li>
                    ))
                }
            </ul>
        )
    }
}

export default InvoicesTable