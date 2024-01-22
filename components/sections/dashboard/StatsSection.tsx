"use client"

import DashboardStatsCard from '@/components/ui/cards/DashboardStatsCard'
import { getInvoices } from '@/query_functions/invoices'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import Stripe from 'stripe'
import { IoBarChart, IoCalendar, IoCard, IoWallet } from 'react-icons/io5'
import { isSameMonth } from 'date-fns'

const StatsSection = ({dict}: any) => {
    const { stats_card: stats_card_dictionary } = dict.pages.dashboard.components

    const { data: openInvoices, isPending: isPendingOpenInvoices } = useQuery({
        queryKey: ['invoices'],
        queryFn: () => getInvoices("open"),
    })

    const [openInvoicesAmount, setOpenInvoicesAmount] = useState(0)

    useEffect(() => {
        let invSum = 0
        openInvoices.forEach((inv: Stripe.Invoice)=> {
            invSum += inv.amount_due
        });
        setOpenInvoicesAmount(invSum)
    }, [])

    const { data: paidInvoices, isPending: isPendingPaidInvoices } = useQuery({
        queryKey: ['paid-invoices'],
        queryFn: () => getInvoices("paid"),
    })

    const [paidInvoicesAmount, setPaidInvoicesAmount] = useState(0)
    const [paidThisMonthAmount, setPaidThisMonthAmount] = useState(0)

    useEffect(() => {
        let invSum = 0
        let thisMonthSum = 0
        paidInvoices.forEach((inv: Stripe.Invoice)=> {
            invSum += inv.amount_due
            if (inv.status_transitions.paid_at &&
                isSameMonth(new Date(), new Date(inv.status_transitions.paid_at * 1000))) {
                thisMonthSum += inv.amount_due
            }
        });
        setPaidInvoicesAmount(invSum)
        setPaidThisMonthAmount(thisMonthSum)
    }, [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-4 gap-4 w-full'>
            <DashboardStatsCard title={stats_card_dictionary.card_open_invoices["title"]} subtitle={stats_card_dictionary.card_open_invoices["subtitle"]} icon={<IoWallet/>} isPending={isPendingOpenInvoices} content={openInvoices.length} color='red'/>
            <DashboardStatsCard title={stats_card_dictionary.card_open_amount["title"]} subtitle={stats_card_dictionary.card_open_amount["subtitle"]} icon={<IoCard/>} isPending={isPendingOpenInvoices} content={openInvoicesAmount} currency color='yellow' />
            <DashboardStatsCard title={stats_card_dictionary.card_paid_this_month["title"]} subtitle={stats_card_dictionary.card_paid_this_month["subtitle"]} icon={<IoCalendar/>} isPending={isPendingPaidInvoices} content={paidThisMonthAmount} currency color='green' />
            <DashboardStatsCard title={stats_card_dictionary.card_paid_all_time["title"]} subtitle={stats_card_dictionary.card_paid_all_time["subtitle"]} icon={<IoBarChart/>} isPending={isPendingPaidInvoices} content={paidInvoicesAmount} currency color='blue' />
        </div>
    )
}

export default StatsSection