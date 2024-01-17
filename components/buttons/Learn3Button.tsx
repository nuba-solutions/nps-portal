"use client"

import { useLearn3State } from '@/contexts/Learn3StateContext'
import Link from 'next/link'
import React from 'react'
import { IoSchool } from 'react-icons/io5'
import Button from '../ui/buttons/Button'

const Learn3Button = () => {
    const { learn3Link } = useLearn3State()
    return (
        <Button
            sz='xs'
            variant='light'
            circle
            link={learn3Link}
            target='_blank'
            className={`shadow-none ${!learn3Link ? 'hidden' : ''}`}
        >
            <IoSchool className="text-base"/>
        </Button>
    )
}

export default Learn3Button