"use client"

import { useEffect } from 'react'
import { useLearn3State } from '@/contexts/Learn3StateContext'

const Learn3Introduction = ({learn3Links}: Partial<TClientProvider>) => {
    const { setLearn3Link } = useLearn3State()
    useEffect(() => setLearn3Link(learn3Links?.introduction), [])

    return null
}

export default Learn3Introduction