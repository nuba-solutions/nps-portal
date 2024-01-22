"use client"

import { useEffect } from 'react'
import { useLearn3State } from '@/contexts/Learn3StateContext'

const Learn3PtsdClaims = ({learn3Links}: Partial<TClientProvider>) => {
    const { setLearn3Link } = useLearn3State()
    useEffect(() => setLearn3Link(learn3Links?.ptsd_claims), [])

    return null
}

export default Learn3PtsdClaims