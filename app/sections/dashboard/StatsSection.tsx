"use client"

import DashboardStatsCard from '@/components/ui/cards/DashboardStatsCard'
import { getInvoices } from '@/query_functions/invoices'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import Stripe from 'stripe'
import { IoBarChart, IoCard, IoCash, IoWallet } from 'react-icons/io5'

const StatsSection = () => {

    const { data: invoices, isPending } = useQuery({
        queryKey: ['invoices'],
        queryFn: () => getInvoices("open"),
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    const [openInvoicesAmount, setOpenInvoicesAmount] = useState(0)

    useEffect(() => {
        console.log(invoices)
        let invSum = 0
        invoices.forEach((inv: Stripe.Invoice)=> {
            invSum += inv.amount_due
        });
        setOpenInvoicesAmount(invSum)
    }, [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-4 gap-4 w-full'>
            <DashboardStatsCard title='Open Invoices' subtitle='Total invoices pending payment' icon={<IoWallet/>} content={invoices.length} color='red'/>
            <DashboardStatsCard title='Open Invoices Amount' subtitle='Sum of all invoices pending payment' icon={<IoCard/>} content={openInvoicesAmount} currency color='yellow' />
            <DashboardStatsCard title='Paid this Month' subtitle='Total amount paid this month' icon={<IoCash/>} content={12390} currency color='green' />
            <DashboardStatsCard title='YTD Payments' subtitle='Amount paid during the current year' icon={<IoBarChart/>} content={2390} currency color='blue' />
        </div>
    )
}

export default StatsSection