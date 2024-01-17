"use client"

import { getInvoices } from '@/query_functions/invoices'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import DashboardChartsCard from '@/components/ui/cards/DashboardChartsCard'
import { getPaidInvoicesInPastSixMonths, getSegmentedDataByMonth } from '@/utils/chart_data_helpers'

const AreaChartSection = () => {
    const { data: paidInvoices, isPending: isPendingPaidInvoices } = useQuery({
        queryKey: ['paid-invoices'],
        queryFn: () => getInvoices("paid"),
    })

    const [paidInPastSixMonths, setPaidInPastSixMonths] = useState([
        {
            name: '',
            amt: 0
        }
    ])

    const handleGetInvoicesPaidInPastSixMonths = async () => {
        let {data, startDate} = await getPaidInvoicesInPastSixMonths(paidInvoices)
        let segmentedData = await getSegmentedDataByMonth(data, startDate)
        setPaidInPastSixMonths(segmentedData)
    }

    useEffect(() => {
        handleGetInvoicesPaidInPastSixMonths()
    }, [])

    return (
        <div className='grid grid-cols-1 3xl:grid-cols-2 gap-4 w-full'>
            <DashboardChartsCard title='Last 6 Months' subtitle='This is a graphical representation of all your payments withing this period' isPending={isPendingPaidInvoices} data={paidInPastSixMonths}/>
        </div>
    )
}

export default AreaChartSection