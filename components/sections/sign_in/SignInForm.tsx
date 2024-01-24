"use client"

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, TSignInSchema } from '@/types/schemas/signIn'
import { getClientProviders } from '@/utils/theme_providers'
import Button from '@/components/ui/buttons/Button'
import Select from '@/components/ui/inputs/Select'
import InputGroup from '@/components/ui/inputs/InputGroup'
import Input from '@/components/ui/inputs/Input'
import { useRouter } from 'next/navigation'
import { Locale } from '@/i18n.config'

const SignInForm = ({dict, lang}: {
	dict: any
	lang: Locale
}) => {
	const router = useRouter()
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

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
			client_provider: data.client_provider,
			email: data.email,
			password: data.password,
			redirect: false,
      	})

		if (singInData?.error) {
			setError("root", {
				type: "server",
				message: dict.pages.sign_in.form["error"]
			})
			return
		}

		router.replace(`/${lang}/dashboard`)
		window.location.reload()
	}

	const providers = getClientProviders()

	return (
		<form
			className='relative z-10 w-full bg-slate-50 dark:bg-slate-900 px-8 rounded-3xl md:mt-4 md:w-[450px] lg:bg-white lg:py-14 lg:px-10 lg:w-[400px] lg:shadow-2xl lg:shadow-slate-700/60 xl:w-[450px]'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Image
				src="/nvoicex/nvoicex.svg"
				alt="Nvoicex Logo"
				width={280}
				height={100}
				priority
				className='select-none mx-auto mt-4 dark:hidden max-w-[220px] md:max-w-[280px]'
			/>
			<Image
				src="/nvoicex/nvoicex-light.svg"
				alt="Nvoicex Logo"
				width={280}
				height={100}
				priority
				className='select-none mx-auto mt-4 hidden dark:block max-w-[220px] md:max-w-[280px]'
			/>
			<InputGroup className="mt-14">
				<Select
					id="signin-provider"
					label={dict.pages.sign_in.form["provider"]}
					name="client_provider"
					error={errors.client_provider}
					register={register}
				>
					<option value="">{dict.pages.sign_in.form["provider-placeholder"]}</option>
					{
						providers.map((provider) => (
							<option key={provider.id} value={provider.id}>{provider.display_name}</option>
						))
					}
				</Select>
			</InputGroup>
			{
				errors.client_provider ? (
					<p className='text-red-500 mt-2'>{`${errors.client_provider.message}`}</p>
				) : null
			}
			<InputGroup className='mt-3'>
				<Input
					type="email"
					id="signin-email"
					name="email"
					label={dict.pages.sign_in.form["email"]}
					error={errors.email}
					placeholder={dict.pages.sign_in.form["email-placeholder"]}
					register={register}
				/>
			</InputGroup>
			{
				errors.email ? (
					<p className='text-red-500 mt-2'>{`${errors.email.message}`}</p>
				) : null
			}
			<InputGroup className='mt-3 relative'>
				<Input
					type={isPasswordVisible ? 'text' : "password"}
					id="signin-password"
					name='password'
					label={dict.pages.sign_in.form["password"]}
					error={errors.password}
					placeholder={dict.pages.sign_in.form["password-placeholder"]}
					register={register}
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
			</InputGroup>
			{
				errors.password ? (
					<p className='text-red-500 mt-2'>{`${errors.password.message}`}</p>
				) : null
			}

			<Button
				variant='primary'
				className='w-full mt-8'
				disabled={isSubmitting}
			>
				{isSubmitting ? (
					<>
						<AiOutlineLoading3Quarters className="spinner"/>
						{dict.pages.sign_in.form["button-submitting"]}
					</>
				) : (
					<>{dict.pages.sign_in.form["button-default"]}</>
				)}
			</Button>
			{
				errors.root ? (
					<p className='text-red-500 mt-6 bg-red-500/20 py-4 px-6 rounded-lg text-center'>{`${errors.root.message}`}</p>
				) : null
			}
		</form>
	)
}

export default SignInForm