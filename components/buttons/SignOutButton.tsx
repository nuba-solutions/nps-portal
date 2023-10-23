"use client"

import React from 'react'
import { signOut } from 'next-auth/react'

export const SignOutButton: React.FC<HTMLButtonElement> = () => {
	return (
		<button
			type='button'
			className='btn btn-primary btn-sm shadow-md'
			onClick={() => signOut({
				redirect: true,
				callbackUrl: `${window.location.origin}/sign-in`
			})}
		>
			Sign out
		</button>
	)
}
