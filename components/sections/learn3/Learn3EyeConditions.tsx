"use client"

import { useEffect } from 'react'
import { useLearn3State } from '@/contexts/Learn3StateContext'

const Learn3EyeConditions = ({learn3Links}: Partial<TClientProvider>) => {
    const { setLearn3Link } = useLearn3State()
    useEffect(() => setLearn3Link(learn3Links?.eye_conditions), [])

    return null
}

export default Learn3EyeConditions