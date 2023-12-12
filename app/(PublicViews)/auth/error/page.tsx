"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function page() {
    const searchParams = useSearchParams()
    const search = searchParams.get('error')
    return (
        <div>{search}</div>
    )
}
