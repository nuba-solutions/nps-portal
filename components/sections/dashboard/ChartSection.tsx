"use client"

import { getInvoices } from '@/query_functions/invoices'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import DashboardChartsCard from '@/components/ui/cards/DashboardChartsCard'
import { getPaidInvoicesInPastSixMonths, getPaidInvoicesInPastTwelveMonths, getProviderColors, getSegmentedDataByMonthSix, getSegmentedDataByMonthTwelve } from '@/utils/charts_helpers'

type TAreaChartProps = {
    provider: TClientProvider
    theme?: string
    dict: any
}

const AreaChartSection = ({provider, theme, dict}: TAreaChartProps) => {
    const { charts_card: charts_card_dictionary } = dict.pages.dashboard.components

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
    const [paidInPastTwelveMonths, setPaidInPastTwelveMonths] = useState([
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
        let segmentedData = await getSegmentedDataByMonthSix(data, startDate)
        setPaidInPastSixMonths(segmentedData)
    }

    const handleGetInvoicesPaidInPastTwelveMonths = async () => {
        let {data, startDate} = await getPaidInvoicesInPastTwelveMonths(paidInvoices)
        let segmentedData = await getSegmentedDataByMonthTwelve(data, startDate)
        setPaidInPastTwelveMonths(segmentedData)
    }

    const handleGetClientProviderColors = async () => {
        const clientProviderColors = await getProviderColors(provider)
        setClientColors(clientProviderColors)
    }

    useEffect(() => {
        handleGetInvoicesPaidInPastSixMonths()
        handleGetInvoicesPaidInPastTwelveMonths()
        handleGetClientProviderColors()
    }, [])

    return (
        <div className='grid grid-cols-1 3xl:grid-cols-2 gap-4 w-full'>
            <DashboardChartsCard title={charts_card_dictionary.line_chart["title"]} subtitle={charts_card_dictionary.line_chart["subtitle"]}
                isPending={isPendingPaidInvoices} data={paidInPastSixMonths}
                colors={clientColors} chart='area' theme={theme}/>
            <DashboardChartsCard title={charts_card_dictionary.bar_chart["title"]} subtitle={charts_card_dictionary.bar_chart["subtitle"]}
                isPending={isPendingPaidInvoices} data={paidInPastTwelveMonths}
                colors={clientColors} chart='bar' theme={theme}/>
        </div>
    )
}

export default AreaChartSection