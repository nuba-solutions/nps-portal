"use client"

import { useEffect } from 'react'
import { useLearn3State } from '@/contexts/Learn3StateContext'

const Learn3RespiratorySystem = ({learn3Links}: Partial<TClientProvider>) => {
    const { setLearn3Link } = useLearn3State()
    useEffect(() => setLearn3Link(learn3Links?.respiratory_system), [])

    return null
}

export default Learn3RespiratorySystem