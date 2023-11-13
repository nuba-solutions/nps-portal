import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavLogo = () => {
    return (
        <Link href={'/dashboard'} className='h-full flex items-center ml-2'>
            <Image
                src="/nvoicex.svg"
                alt="Nvoicex Logo"
                width={180}
                height={100}
                priority
                className='select-none dark:hidden'
            />
            <Image
                src="/nvoicex-light.svg"
                alt="Nvoicex Logo"
                width={180}
                height={100}
                priority
                className='select-none hidden dark:block'
            />
        </Link>
    )
}

export default NavLogo