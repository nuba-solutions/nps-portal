import { getDictionary } from '@/utils/dictionaries'
import SignInForm from '@/components/sections/sign_in/SignInForm'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Locale } from '@/i18n.config'

export default async function SignInPage({ params: {lang}}: { params: { lang: Locale } }) {
	const dict = await getDictionary(lang)
	const session = await getServerSession(authOptions)
	if (session?.user) redirect(`/${lang}/dashboard`)

	return (
		<main className='relative flex flex-col justify-center items-center lg:flex-row min-h-screen w-full lg:justify-between overflow-hidden'>
			<div className='relative hidden lg:block w-full p-10 lg:w-6/12 2xl:w-8/12 lg:p-20 lg:pt-28 lg:min-h-screen bg-primary-500'>
				<h1 className='text-white text-2xl lg:text-3xl font-semibold 2xl:text-5xl'>
					{dict.pages.sign_in["welcome"]}
					<span className='font-bold'>{dict.pages.sign_in["nvoicex"]}</span>
				</h1>
				<p className='text-white'>
					{dict.pages.sign_in["about"]}
					<Link
						href="https://nubasolutions.com"
						className='ml-1 hover:underline underline-offset-2 font-semibold'
						target='_blank'
					>
						Nuba Solutions
					</Link>
				</p>
				<span className='hidden rounded-full bg-primary-600/40 h-[1700px] w-[1700px] absolute z-0 right-52 top-56 lg:block 2xl:h-[2000px] 2xl:w-[2000px] 3xl:h-[2000px] 3xl:w-[2000px] 4xl:h-[2600px] 4xl:w-[2600px]'></span>
			</div>
			<div className='relative bg-slate-50 dark:bg-slate-900 w-full lg:w-6/12 2xl:w-4/12 flex flex-col justify-center items-center overflow-hidden lg:min-h-screen'>
				<SignInForm dict={dict} lang={lang}/>
			</div>
			<Image
				src="/nvoicex/signin_bg.svg"
				alt="Nvoicex Sign In Image"
				width={400}
				height={200}
				priority
				className='hidden lg:block select-none z-10 absolute -bottom-1 left-0 lg:w-7/12 3xl:w-[60%]'
			/>
		</main>
	)
}
