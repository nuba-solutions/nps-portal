"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'

const SignInForm = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

	return (
		<form className='relative z-10 w-full bg-slate-50 px-4 rounded-3xl md:mt-4 md:w-[450px] lg:py-14 lg:px-10 lg:w-[400px] lg:shadow-2xl lg:shadow-slate-700/60 xl:w-[450px]'>
			<Image
				src="/nvoicex.svg"
				alt="Nvoicex Logo"
				width={280}
				height={100}
				priority
				className='select-none mx-auto mt-4'
			/>
			<div className='flex flex-col mt-14 w-full'>
				<label htmlFor="signin-email" className='text-secondary-500 mb-2 font-semibold'>Email</label>
				<input type="text" id="signin-email" className='h-[50px] rounded-lg border-2 border-slate-300 p-4' placeholder='email@example.com'/>
			</div>
			<div className='flex flex-col mt-4 w-full relative'>
				<label htmlFor="signing-password" className='text-secondary-500 mb-2 font-semibold'>Password</label>
				<input type={isPasswordVisible ? 'text' : "password"} id="signin-password" className='h-[50px] rounded-lg border-2 border-slate-300 p-4' placeholder='Type in your password'/>
				{
					isPasswordVisible ? (
						<IoEyeOff className="absolute bottom-4 right-4 text-slate-500 cursor-pointer"
							onClick={() => setIsPasswordVisible(false)}
						/>
					) : (
						<IoEye className="absolute bottom-4 right-4 text-slate-500 cursor-pointer"
							onClick={() => setIsPasswordVisible(true)}
						/>
					)
				}
			</div>

			<button className='mt-8 bg-primary-500 text-white font-semibold h-[50px] px-6 rounded-lg w-full shadow-md hover:bg-primary-600'>SIGN IN</button>
		</form>
	)
}

export default SignInForm