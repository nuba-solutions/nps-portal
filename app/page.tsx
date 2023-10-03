import SignInForm from '@/components/forms/SignInForm'
import Image from 'next/image'

export default function Home() {
	return (
		<main className='relative flex flex-col lg:flex-row h-fit md:min-h-screen w-full lg:justify-between'>
			<div className='w-full p-10 lg:w-6/12 lg:p-20 lg:pt-28'>
				<h1 className='text-2xl lg:text-3xl text-secondary-500 font-bold 2xl:text-5xl'>Welcome to Nvoicex</h1>
				<p className='text-slate-400'>A payment system developed by Nuba Solutions</p>
				<hr className='h-px mt-8 md:hidden'/>
			</div>
			<div className='relative lg:bg-primary-500 w-full lg:w-6/12 flex flex-col justify-center items-center overflow-hidden'>
				<SignInForm/>
				<span className='hidden rounded-full bg-primary-600/30 h-[1700px] w-[1700px] absolute z-0 -right-full top-56 lg:block 2xl:h-[2000px] 2xl:w-[2000px] 3xl:h-[2000px] 3xl:w-[2000px] 4xl:h-[2600px] 4xl:w-[2600px]'></span>
			</div>
			<Image
				src="/signin_bg.svg"
				alt="Nvoicex Sign In Image"
				width={400}
				height={200}
				priority
				className='select-none absolute bottom-0 left-0 hidden md:block lg:w-7/12 3xl:w-[55%]'
			/>
		</main>
	)
}
