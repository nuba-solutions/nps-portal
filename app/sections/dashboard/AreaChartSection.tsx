"use client"

import { getInvoices } from '@/query_functions/invoices'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import DashboardChartsCard from '@/components/ui/cards/DashboardChartsCard'
import { getPaidInvoicesInPastSixMonths, getProviderColors, getSegmentedDataByMonth } from '@/utils/charts_helpers'

type TAreaChartProps = {
    provider: TClientProvider
}

const AreaChartSection = ({provider}: TAreaChartProps) => {
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
    const [clientColors, setClientColors] = useState<any>({
        color: '',
        accent: ''
    })

    const handleGetInvoicesPaidInPastSixMonths = async () => {
        let {data, startDate} = await getPaidInvoicesInPastSixMonths(paidInvoices)
        let segmentedData = await getSegmentedDataByMonth(data, startDate)
        setPaidInPastSixMonths(segmentedData)
    }

    const handleGetClientProviderColors = async () => {
        const clientProviderColors = await getProviderColors(provider)
        setClientColors(clientProviderColors)
    }

    useEffect(() => {
        handleGetInvoicesPaidInPastSixMonths()
        handleGetClientProviderColors()
    }, [])

    return (
        <div className='grid grid-cols-1 3xl:grid-cols-2 gap-4 w-full'>
            <DashboardChartsCard title='Last 6 Months' subtitle='This is a graphical representation of all your payments withing this period'
                isPending={isPendingPaidInvoices} data={paidInPastSixMonths}
                colors={clientColors}/>
        </div>
    )
}

export default AreaChartSection