"use client"

import React, { useRef } from 'react'
import Link from 'next/link'
import { IoLogOut, IoMan, IoOptions } from 'react-icons/io5'
import { signOut } from 'next-auth/react'
import useComponentVisible from '@/hooks/useClickOutside'
import { JWT } from 'next-auth/jwt'

type TUserProfile = {
	user: {
		address: string
		accessToken: JWT
	} & {
		name?: string  | null | undefined
		email?: string  | null | undefined
		image?: string | null | undefined
	} | undefined
}

const UserProfile = ({user}: TUserProfile) => {
	const profileRef = useRef<any>()
	const {
		isComponentVisible,
		setIsComponentVisible
	} = useComponentVisible(false, profileRef);

	const handleGetUserInitials = () => {
		let namesArray = user?.name?.split(/\s/)
		let fullName = user?.name

		if (namesArray && namesArray.length > 2) {
			fullName = namesArray[0].concat(" ", namesArray[namesArray.length - 1])
		}

		let initials = fullName && fullName.split(/\s/).reduce((response: string, word: string) => response += word.slice(0,1),'')
		return initials
	}

	return (
		<div className='flex items-center gap-5 border-l border-l-slate-300 dark:border-l-slate-700 pl-4'>
			<div className='hidden md:flex flex-col items-end gap-0'>
				<p className='text-xs text-slate-500'>👋 Welcome Back,</p>
				<h2 className='font-semibold'>{user?.name}</h2>
			</div>

			<div className='relative z-50'>
				<div className='rounded-full h-[40px] w-[40px] bg-primary-500 cursor-pointer flex items-center justify-center text-white ring-4 ring-primary-500/20 dark:ring-primary-500/40 font-semibold'
					onClick={setIsComponentVisible}
				>
					{handleGetUserInitials()}
				</div>
				{
					isComponentVisible ? (
						<div ref={profileRef} className='bg-white dark:bg-slate-800 rounded-xl pt-4 absolute mt-2 right-0 shadow-xl border border-slate-300 dark:border-slate-700 overflow-clip min-w-[250px] w-[300px]'>
							<div className="text-right px-6">
								<h2 className='font-semibold text-primary-500 text-base'>{user?.name}</h2>
								<p className='text-sm'>{user?.email}</p>
							</div>
							<hr className='h-px mt-4 px-6 border-slate-300 dark:border-slate-700'/>
							<ul className='px-2 py-2'>
								<li>
									<Link href={'/'} className='flex items-center justify-between w-full h-full py-2 px-3 rounded-lg hover:bg-slate-100 hover:dark:bg-slate-900 hover:text-primary-500'>
										Profile
										<IoMan className="text-base"/>
									</Link>
								</li>
								<li>
									<Link href={'/'} className='flex items-center justify-between w-full h-full py-2 px-3 rounded-lg hover:bg-slate-100 hover:dark:bg-slate-900 hover:text-primary-500'>
										Preferences
										<IoOptions className="text-base"/>
									</Link>
								</li>
								<li>
									<button className='flex items-center justify-between w-full h-full py-2 px-3 rounded-lg hover:bg-slate-100 hover:dark:bg-slate-900 hover:text-primary-500'
										onClick={() => signOut({
											redirect: true,
											callbackUrl: "/"
										})}
									>
										Sign out
										<IoLogOut className="text-base"/>
									</button>
								</li>
							</ul>
						</div>
					) : null
				}
			</div>
		</div>
	)
}

export default UserProfile