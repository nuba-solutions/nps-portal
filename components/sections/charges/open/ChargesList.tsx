"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/query_functions/users'
import BaseLoader from '@/components/ui/loaders/BaseLoader'

const ChargesList = () => {
    const { data: user, isError, isPending, error } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
    })

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    if (isPending) {
        return <BaseLoader/>
    }

    if (user) {
        return (
            <pre>
                {JSON.stringify(user, null, 3)}
            </pre>
        )
    }
}

export default ChargesList