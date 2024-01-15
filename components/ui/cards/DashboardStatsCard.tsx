import { formatAmountForDisplay } from '@/utils/stripe-helpers'
import React from 'react'

type TDashboardStatsCardProps = {
    title: string
    subtitle: string
    icon: React.ReactNode
    content: string | number
    color?: 'blue' | 'red' | 'green' | 'yellow' | 'primary'
    currency?: boolean
}

const DashboardStatsCard = ({title, subtitle, icon, content, color, currency}: TDashboardStatsCardProps) => {
    let iconTextColorClass = color ? `text-${color}-500` : ''

    return (
        <div className={`flex items-center justify-between px-3 py-6 sm:px-6 bg-white dark:bg-slate-800 rounded-lg md:rounded-xl shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50`}>
            <div className="flex items-center gap-4">
                <div className={`h-[40px] w-[40px] rounded-full flex items-center justify-center text-lg ${iconTextColorClass} bg-slate-100 dark:bg-slate-700`}>
                    {icon}
                </div>
                <span className='max-w-[60%]'>
                    <p className='font-semibold text-base'>{title}</p>
                    <p className='text-xs opacity-80'>{subtitle}</p>
                </span>
            </div>
            <div className='text-xl xl:text-2xl font-semibold'>{currency ? formatAmountForDisplay(content as number / 100, "usd") : content}</div>
        </div>
    )
}

export default DashboardStatsCard