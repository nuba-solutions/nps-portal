import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import PrivateLayout from "../_layout";
import React from 'react'

export default async function UsersPage() {
	const session = await getServerSession(authOptions)

	return (
		<PrivateLayout>
			<section className='p-4 flex-1'>
				<h1 className="page-heading text-primary-500">Dashboard Page</h1>
			</section>
		</PrivateLayout>
	)
}
