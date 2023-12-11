"use client"

import { useLearn3State } from '@/contexts/Learn3StateContext'
import Link from 'next/link'
import React from 'react'
import { IoSchool } from 'react-icons/io5'

const Learn3Button = () => {
    const { learn3Link } = useLearn3State()
    return (
        <Link
            href={learn3Link}
            target='_blank'
            className={`flex items-center justify-center w-[35px] h-[35px] rounded-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:text-primary-500 hover:dark:text-white ${!learn3Link ? 'hidden' : ''}`}
        >
            <IoSchool className="text-base"/>
        </Link>
    )
}

export default Learn3Button