"use client"

import React from 'react'
import { signOut } from 'next-auth/react'
import { useParams } from 'next/navigation'

export const SignOutButton: React.FC<HTMLButtonElement> = () => {
	const { lang } = useParams()
	return (
		<button
			type='button'
			className='btn btn-primary btn-sm shadow-md'
			onClick={() => signOut({
				redirect: true,
				callbackUrl: `${window.location.origin}/${lang}/auth/sign-in`
			})}
		>
			Sign out
		</button>
	)
}
