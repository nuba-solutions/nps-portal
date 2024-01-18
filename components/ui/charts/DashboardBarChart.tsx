import useMediaQuery from '@/hooks/useMediaQuery'
import { formatAmountForDisplay } from '@/utils/stripe-helpers'
import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts'

type TBarChartProps = {
    data: any
    isPending?: boolean
    colors: {
        base: string,
        accent: string
    }
    theme?: string
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-900 shadow-xl rounded-lg px-4 py-3">
                <p className="label">{payload[0].payload.name}</p>
                <p className="desc">Total Paid: {formatAmountForDisplay(payload[0].value as number / 100, "usd")}</p>
            </div>
        );
    }

    return null;
};

const DashboardBarChart = ({data, isPending, colors, theme} : TBarChartProps) => {
    const { width } = useMediaQuery()
    let barSize = 7, marginX = 15

    if (width && width < 768) {
        barSize = 4
        marginX = 5
    }

    if (width && width >= 768 && width < 1280) {
        barSize = 6
        marginX = 10
    }

    return (
        <div className='pb-10 h-[300px] 3xl:h-[400px] 4xl:h-[600px] w-full px-5'>
            {
                !isPending ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 20,
                                right: marginX,
                                left: marginX,
                                bottom: 5,
                            }}
                            barSize={barSize}
                        >
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}}/>
                            <Bar
                                dataKey="amt"
                                fill={colors.base}
                                background={{ fill: theme === 'light' ? '#f1f5f9' : '#141b26' }}
                                radius={[10, 10, 10, 10]}
                                markerWidth={1}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : null
            }
        </div>
    )
}

export default DashboardBarChart