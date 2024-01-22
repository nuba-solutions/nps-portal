"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const NavLogo = ({logo_url}: Partial<TClientProvider>) => {
    const { lang } = useParams()
    return (
        <Link href={`/${lang}/dashboard`} className='h-full flex items-center ml-2'>
            <Image
                src={logo_url?.light || "/providers/nvoicex_color"}
                alt="Nvoicex Logo"
                width={180}
                height={100}
                priority
                className='select-none dark:hidden max-w-[115px] md:max-w-[150px]'
            />
            <Image
                src={logo_url?.dark || "/providers/nvoicex_white"}
                alt="Nvoicex Logo"
                width={180}
                height={100}
                priority
                className='select-none hidden dark:block max-w-[115px] md:max-w-[150px]'
            />
        </Link>
    )
}

export default NavLogo