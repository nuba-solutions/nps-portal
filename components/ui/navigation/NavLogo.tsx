import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavLogo = () => {
    return (
        <Link href={'/dashboard'} className='h-full flex items-center'>
            <Image
                src="/nvoicex.svg"
                alt="Nvoicex Logo"
                width={180}
                height={100}
                priority
                className='select-none'
            />
            <Image
                src="/nvoicex_light.svg"
                alt="Nvoicex Logo"
                width={180}
                height={100}
                priority
                className='select-none'
            />
        </Link>
    )
}

export default NavLogo