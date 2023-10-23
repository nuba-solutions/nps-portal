import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
	return (
		<main className='relative flex flex-col lg:flex-row h-fit min-h-screen w-full lg:justify-between overflow-hidden'>
			<div className='w-full p-10 lg:w-6/12 lg:p-20 lg:pt-28'>
				<h1 className='text-2xl lg:text-3xl text-primary-500 font-bold 2xl:text-5xl'>Welcome to Nvoicex</h1>
				<p className='text-secondary-500'>
					An integrated payments software developed by
					<Link
						href="https://nubasolutions.com"
						className='ml-1 text-primary-500 hover:underline underline-offset-2 font-semibold'
						target='_blank'
					>
						Nuba Solutions
					</Link>
				</p>
				<hr className='h-px mt-8 md:hidden'/>
			</div>
			<div className='relative lg:bg-white w-full lg:w-6/12 flex flex-col justify-center items-center overflow-hidden'>
				<Image
					src="/nvoicex.svg"
					alt="Nvoicex Logo"
					width={280}
					height={100}
					priority
					className='select-none mx-auto mt-10 xl:w-[60%] 2xl:w-[50%]'
				/>
				<Link href={'/api/auth/signin'}
					className='mt-10 btn btn-primary shadow-xl'>
					Sign in with your account
				</Link>
			</div>
			<Image
				src="/signin_bg_alt.svg"
				alt="Nvoicex Sign In Image"
				width={400}
				height={200}
				priority
				className='select-none absolute -bottom-1 left-0 w-full md:w-8/12 lg:w-7/12 3xl:w-[55%]'
			/>
		</main>
	)
}
