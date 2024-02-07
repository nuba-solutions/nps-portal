"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/query_functions/users'
import BaseLoader from '@/components/ui/loaders/BaseLoader'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { getCharges } from '@/query_functions/charges'
import InvoiceCard from '@/components/ui/cards/InvoiceCard'
import ChargeCard from '@/components/ui/cards/ChargeCard'

const ChargesList = () => {
    const { data: charges, isPending, error } = useQuery({
        queryKey: ['charges'],
        queryFn: () => getCharges(),
    })

    if (isPending) {
        return <BaseLoader/>
    }

    // if (charges) {
    //     return (
    //         <>
    //         {
    //             charges.map((charge: TCharge) => (
    //                 <pre key={charge.id}>
    //                     {JSON.stringify(charge, null, 3)}
    //                 </pre>
    //             ))
    //         }
    //         </>
    //     )
    // }

    if (charges) {
        return (
            <ul className='grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4'>
                {
                    charges.map((charge: TCharge) => (
                        <li key={charge.id} className='w-full'>
                            <ChargeCard charge={charge}/>
                        </li>
                    ))
                }
            </ul>
        )
    }
}

export default ChargesList