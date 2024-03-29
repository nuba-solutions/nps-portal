"use client"

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { IoEye, IoEyeOff, IoLockOpen } from 'react-icons/io5'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getSignInSchema, TSignInSchema } from '@/types/schemas/signIn'
import Button from '@/components/ui/buttons/Button'
import Select from '@/components/ui/inputs/Select'
import InputGroup from '@/components/ui/inputs/InputGroup'
import Input from '@/components/ui/inputs/Input'
import { useRouter } from 'next/navigation'
import { Locale } from '@/i18n.config'
import { useQuery } from '@tanstack/react-query'
import { getTenantProviders } from '@/query_functions/tenants'

const SignInForm = ({dict, lang}: {
	dict: any
	lang: Locale
}) => {
	const { data: tenantProviders, isPending } = useQuery({
        queryKey: ['tenant_providers'],
        queryFn: () => getTenantProviders()
    })

	const router = useRouter()
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<TSignInSchema>({
		resolver: zodResolver(getSignInSchema(dict))
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

	return (
		<form
			className='relative z-10 w-full px-3 sm:w-[350px] rounded-3xl md:mt-4 md:w-[450px] lg:py-14 lg:px-10 lg:w-[400px] xl:w-[450px]'
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
					disabled={isSubmitting || isPending}
				>
					<option value="DEFAULT">{dict.pages.sign_in.form["provider-placeholder"]}</option>
					{
						tenantProviders && tenantProviders.map((provider: TClientProvider) => (
							<option key={provider.id} value={provider.id}>{provider.name}</option>
						))
					}
				</Select>
			</InputGroup>
			{
				errors.client_provider ? (
					<p className='text-red-500/80 mt-2 leading-4'>{`${errors.client_provider.message}`}</p>
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
					disabled={isSubmitting}
				/>
			</InputGroup>
			{
				errors.email ? (
					<p className='text-red-500 mt-2 leading-4'>{`${errors.email.message}`}</p>
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
					disabled={isSubmitting}
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
					<p className='text-red-500 mt-2 leading-4'>{`${errors.password.message}`}</p>
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
					<div className='flex items-center gap-3 mt-6 py-4 px-6'>
						<span className='p-2 bg-red-500/10 rounded-lg'>
							<IoLockOpen className="text-base text-red-500"/>
						</span>
						<p className='text-red-500 rounded-lg leading-4'>{`${errors.root.message}`}</p>
					</div>
				) : null
			}
		</form>
	)
}

export default SignInForm