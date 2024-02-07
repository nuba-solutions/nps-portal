"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getInvoicesByStatus } from '@/query_functions/invoices'
import Stripe from 'stripe'
import InvoiceCard from '@/components/ui/cards/InvoiceCard'
import { useSession } from 'next-auth/react'
import BaseLoader from '@/components/ui/loaders/BaseLoader'

type TInvoiceListProps = {
    dict: any
    lang: any
}

const InvoicesList = ({dict, lang}: TInvoiceListProps) => {
    const session = useSession()
    const { data: invoices, isPending } = useQuery({
        queryKey: ['open_invoices'],
        queryFn: () => getInvoicesByStatus('open', session.data?.user.stripeId as string),
    })

    if (isPending) {
        return <BaseLoader/>
    }

    return invoices && invoices.length > 0 ? (
        <ul className='grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4'>
            {
                invoices.map((invoice: Stripe.Invoice) => (
                    <li key={invoice.id} className='w-full'>
                        <InvoiceCard invoice={invoice} dict={dict} lang={lang}/>
                    </li>
                ))
            }
        </ul>
    ) : (
        <div>
            <h2 className='text-xl font-semibold'>{dict.pages.open_charges["empty_title"]}</h2>
            <p>{dict.pages.open_charges["empty_message"]}</p>
        </div>
    )
}

export default InvoicesList