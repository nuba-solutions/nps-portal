"use client"

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { IoLanguage, IoLogOut, IoMan } from 'react-icons/io5'
import { signOut } from 'next-auth/react'
import useComponentVisible from '@/hooks/useClickOutside'
import ThemeSwitcherButton from '@/components/buttons/ThemeSwitcherButton'
import { Session } from 'next-auth'
import { useParams, usePathname } from 'next/navigation'
import { getDictionary } from '@/utils/dictionaries'
import { useBackdropState } from '@/contexts/BackdropContext'
import ProfileButtonSkeleton from '../skeletons/ProfileButtonSkeleton'

type TUserProfileProps = {
    session: Session
}

const UserProfile = ({session}: TUserProfileProps) => {
	const { lang } = useParams()
    const [dict, setDict] = useState<any>({})

    const getProfileDictionary = async () => {
        const { profile } = await getDictionary(lang as any)
        setDict(profile)
    }

    useEffect(() => {
        getProfileDictionary()
    }, [])

	const { setIsBackdropVisible } = useBackdropState()
	const pathName = usePathname()

	const redirectedPathName = () => {
		let locale = lang === 'en' || lang === 'en-US' ? 'es' : 'en'
		if (!pathName) return '/'
		const segments = pathName.split('/')
		segments[1] = locale
		return segments.join('/')
	}

	const profileRef = useRef<any>()
	const {
		isComponentVisible,
		setIsComponentVisible
	} = useComponentVisible(false, profileRef);

	const handleGetUserInitials = () => {
		let namesArray = session?.user?.name?.split(/\s/)
		let fullName = session?.user?.name

		if (namesArray && namesArray.length > 2) {
			fullName = namesArray[0].concat(" ", namesArray[namesArray.length - 1])
		}

		let initials = fullName && fullName.split(/\s/).reduce((response: string, word: string) => response += word.slice(0,1),'')
		return initials
	}

	if (!dict["welcome"]) {
		return <ProfileButtonSkeleton/>
	}

	return (
		<div className='flex items-center gap-5 border-l border-l-slate-300 dark:border-l-slate-700 pl-4'>
			<div className='hidden md:flex flex-col items-end gap-0'>
				<p className='text-xs dark:text-slate-400'>👋 {dict['welcome']}</p>
				<h2 className='font-semibold'>{session?.user?.name}</h2>
			</div>

			<div className='relative z-50'>
				<div className='rounded-full h-[35px] md:h-[40px] w-[35px] md:w-[40px] bg-primary-500 cursor-pointer flex items-center justify-center text-white ring-4 ring-primary-500/20 dark:ring-primary-500/40 font-semibold'
					onClick={() => {
						setIsComponentVisible((prev: boolean) => !prev),
						setIsBackdropVisible((prev: boolean) => !prev)
					}}
				>
					{handleGetUserInitials()}
				</div>
				{
					isComponentVisible ? (
						<div ref={profileRef} className='bg-white dark:bg-slate-700 rounded-xl pt-4 absolute mt-2 right-0 shadow-xl border border-slate-300 dark:border-slate-600 overflow-clip w-fit min-w-[300px] md:min-w-[320px]'>
							<div className="text-right px-6">
								<h2 className='font-semibold text-base'>{session?.user?.name}</h2>
								<p className='text-xs'>{session?.user?.email}</p>
							</div>
							<hr className='h-px mt-4 px-6 border-slate-300 dark:border-slate-600'/>
							<ul className='px-2 py-2'>
								<li>
									<Link href={'/account'} className='flex items-center justify-between w-full h-full py-3 px-3 rounded-lg hover:bg-slate-100 hover:dark:bg-slate-800'>
										{dict['account']}
										<IoMan className="text-base"/>
									</Link>
								</li>
								<li>
									<Link
										href={redirectedPathName()}
										className='flex items-center justify-between w-full h-full py-3 px-3 rounded-lg hover:bg-slate-100 hover:dark:bg-slate-800'
									>
										{dict["language"]}
										<IoLanguage/>
									</Link>
								</li>
								<li>
									<ThemeSwitcherButton session={session} placement="profile"/>
								</li>
								<li>
									<button className='flex items-center justify-between w-full h-full py-3 px-3 rounded-lg hover:bg-slate-100 hover:dark:bg-slate-800'
										onClick={() => signOut({
											redirect: true,
											callbackUrl: "/"
										})}
									>
										{dict['sign-out']}
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