import React from 'react'
import DashboardLineChart from '../charts/DashboardLineChart';
import DashboardBarChart from '../charts/DashboardBarChart';

type TDashboardChartsCardProps = {
    title: string
    subtitle: string
    data: any
    isPending?: boolean
    chart: 'area' | 'bar' | undefined
    theme?: string
    colors: {
        base: string,
        accent: string
    }
}

const DashboardChartsCard = ({title, subtitle, data, isPending, colors, chart, theme}: TDashboardChartsCardProps) => {
    return (
        <div className={`flex flex-col bg-white dark:bg-slate-800 rounded-lg md:rounded-xl shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50`}>
            <span className='px-3 py-6 sm:px-6'>
                <p className='font-semibold text-base'>{title}</p>
                <p className='text-xs opacity-80'>{subtitle}</p>
            </span>
            {
                chart === 'area' ? (
                    <DashboardLineChart data={data} isPending={isPending} colors={colors} theme={theme}/>
                ) : chart === 'bar' ? (
                    <DashboardBarChart data={data} isPending={isPending} colors={colors} theme={theme}/>
                ) : null
            }
        </div>
    )
}

export default DashboardChartsCard