import { formatAmountForDisplay } from '@/utils/stripe-helpers';
import React from 'react'
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

type TDashboardChartsCardProps = {
    title: string
    subtitle: string
    data: any
    isPending?: boolean
}

const dataX = [
    {
      name: 'January',
      amt: 1232,
    },
    {
      name: 'February',
      amt: 2210,
    },
    {
      name: 'March',
      amt: 12232,
    },
    {
      name: 'April',
      amt: 11232,
    },
    {
      name: 'May',
      amt: 33232,
    },
    {
      name: 'June',
      amt: 71232,
    },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-900 shadow-xl rounded-lg px-4 py-3">
                <p className="label">{label}</p>
                <p className="desc">Total Paid: {formatAmountForDisplay(payload[0].value as number / 100, "usd")}</p>
            </div>
        );
    }

    return null;
};

const DashboardChartsCard = ({title, subtitle, data, isPending}: TDashboardChartsCardProps) => {
    return (
        <div className={`flex flex-col bg-white dark:bg-slate-800 rounded-lg md:rounded-xl shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50`}>
            <span className='px-3 py-6 sm:px-6'>
                <p className='font-semibold text-base'>{title}</p>
                <p className='text-xs opacity-80'>{subtitle}</p>
            </span>
            <div className='pb-10 min-h-[300px] 3xl:min-h-[400px] 4xl:min-h-[600px] w-full px-5'>
                {
                    !isPending ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart width={300} height={100} data={data} defaultShowTooltip={true}>
                                <XAxis dataKey="name" opacity={0}/>
                                <Line
                                    type='monotone'
                                    dataKey="amt"
                                    stroke="#3649db"
                                    strokeWidth={3}
                                    dot={{ stroke: '', fill: '#3649db', r: 4 }}
                                    activeDot={{ fill: '#FFFFFF' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : null
                }
            </div>
        </div>
    )
}

export default DashboardChartsCard