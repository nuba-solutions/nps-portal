"use client"

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, TSignInSchema } from '@/types/schemas/signIn'

const SignInForm = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<TSignInSchema>({
		resolver: zodResolver(signInSchema)
	})

	const onSubmit = async (data: TSignInSchema) => {
		const singInData = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
      	})

		if (singInData?.error) {
			setError("root", {
				type: "server",
				message: "Invalid Email or Password! Make sure you type in your credentials correctly."
			})
			return
		}

		router.push('/dashboard')
	}

	return (
		<form
			className='relative z-10 w-full bg-slate-50 dark:bg-slate-900 px-4 rounded-3xl md:mt-4 md:w-[450px] lg:bg-white lg:py-14 lg:px-10 lg:w-[400px] lg:shadow-2xl lg:shadow-slate-700/60 xl:w-[450px]'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Image
				src="/nvoicex.svg"
				alt="Nvoicex Logo"
				width={280}
				height={100}
				priority
				className='select-none mx-auto mt-4 dark:hidden'
			/>
			<Image
				src="/nvoicex-light.svg"
				alt="Nvoicex Logo"
				width={280}
				height={100}
				priority
				className='select-none mx-auto mt-4 hidden dark:block'
			/>
			<div className='flex flex-col mt-14 w-full'>
				<label htmlFor="signin-email" className='label'>Email</label>
				<input type="text" id="signin-email" className={`input ${errors.email ? 'input-error' : ''}`} placeholder='email@example.com'
					{...register("email")}
				/>
			</div>
			{
				errors.email ? (
					<p className='text-red-500 mt-2'>{`${errors.email.message}`}</p>
				) : null
			}
			<div className='flex flex-col mt-4 w-full relative'>
				<label htmlFor="signing-password" className='label'>Password</label>
				<input type={isPasswordVisible ? 'text' : "password"} id="signin-password"
					className={`input ${errors.password ? 'input-error' : ''}`}
					placeholder='Type in your password'
					{...register("password")}
				/>
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
			{
				errors.password ? (
					<p className='text-red-500 mt-2'>{`${errors.password.message}`}</p>
				) : null
			}

			<button
				className='btn btn-primary w-full mt-8 font-semibold'
				disabled={isSubmitting}
			>
				{isSubmitting ? 'Submitting': 'Sign in'}
			</button>
			{
				errors.root ? (
					<p className='text-red-500 mt-6 bg-red-500/20 py-4 px-6 rounded-lg text-center'>{`${errors.root.message}`}</p>
				) : null
			}
		</form>
	)
}

export default SignInForm