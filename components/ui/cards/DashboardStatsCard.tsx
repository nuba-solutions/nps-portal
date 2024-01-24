import { formatAmountForDisplay } from '@/utils/stripe-helpers'
import React from 'react'

type TDashboardStatsCardProps = {
    title: string
    subtitle: string
    icon: React.ReactNode
    content: string | number
    color?: 'blue' | 'red' | 'green' | 'yellow' | 'primary'
    currency?: boolean
    isPending?: boolean
}

const DashboardStatsCard = ({title, subtitle, icon, content, color, currency, isPending}: TDashboardStatsCardProps) => {
    let iconTextColorClass = color ? `text-${color}-500` : ''

    return (
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 py-4 sm:px-6 bg-white dark:bg-slate-800 rounded-lg md:rounded-xl shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50`}>
            <div className="flex items-center gap-4">
                <div className={`h-[40px] w-[40px] min-w-[40px] rounded-full flex items-center justify-center text-lg ${iconTextColorClass} bg-slate-100 dark:bg-slate-700`}>
                    {icon}
                </div>
                <span>
                    <p className='font-semibold text-base'>{title}</p>
                    <p className='text-xs opacity-80'>{subtitle}</p>
                </span>
            </div>
            <hr className='h-px my-4 border-slate-200 dark:border-slate-700 sm:hidden'/>
            {
                !isPending ? (
                    <div className='text-base sm:text-lg xl:text-2xl font-semibold self-end sm:self-center'>{currency ? formatAmountForDisplay(content as number / 100, "usd") : content}</div>
                ) : (
                    <p>NA</p>
                )
            }
        </div>
    )
}

export default DashboardStatsCard