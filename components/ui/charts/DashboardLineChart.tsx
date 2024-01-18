import React from 'react'
import { formatAmountForDisplay } from '@/utils/stripe-helpers';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';

type TLineChartProps = {
    data: any
    isPending?: boolean
    theme?: string
    colors: {
        base: string,
        accent: string
    }
}

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

const DashboardLineChart = ({data, isPending, colors, theme} : TLineChartProps) => {
    return (
        <div className='pb-10 h-[300px] 3xl:h-[400px] 4xl:h-[600px] w-full px-5'>
            {
                !isPending ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart width={300} height={100} data={data} defaultShowTooltip={true}>
                            <XAxis dataKey="name" opacity={0}/>
                            <Line
                                type='monotone'
                                dataKey="amt"
                                stroke={colors.base}
                                strokeWidth={3}
                                dot={{ stroke: '', fill: colors.base, r: 4 }}
                                activeDot={{ fill: theme === 'light' ? '#e2e8f0' : '#090f1d', stroke: theme === 'light' ? '#e2e8f0' : '#090f1d' }}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{stroke: theme === 'light' ? '#e2e8f0' : '#090f1d', strokeWidth: 1}}/>
                        </LineChart>
                    </ResponsiveContainer>
                ) : null
            }
        </div>
    )
}

export default DashboardLineChart