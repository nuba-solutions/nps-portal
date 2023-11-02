"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCharges } from '@/query_functions/charges'

const ChargesList = () => {
    const { data: charges, error, isFetched } = useQuery({
        queryKey: ['charges'],
        queryFn: getCharges
    })

    if (error) <h2>{error.message}</h2>
    if (charges) {
        return (
            <ul>
                {
                    charges.map((charge: Charge) => (
                        <li className='p-6 rounded-lg bg-white dark:bg-slate-700 w-fit my-4'>
                            <h2 className='font-semibold'>{charge.title}</h2>
                            <p>ID: {charge.id}</p>
                            <p>Description: {charge.description}</p>
                            <p>Amount: ${charge.totalAmount}</p>
                            <p>Created: {charge.createdAt.toString()}</p>
                        </li>
                    ))
                }
            </ul>
        )
    }
}

export default ChargesList