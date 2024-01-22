"use client"

import { useEffect } from 'react'
import { useLearn3State } from '@/contexts/Learn3StateContext'

const Learn3Messages = ({learn3Links}: Partial<TClientProvider>) => {
    const { setLearn3Link } = useLearn3State()
    useEffect(() => setLearn3Link(learn3Links?.messages), [])

    return null
}

export default Learn3Messages