import React from 'react'
import PrivateLayout from '../../_layout'
import axios, { AxiosHeaderValue } from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const OpenCharges = async () => {
    const session = await getServerSession(authOptions)

	const { data: users } = await axios.get(`${process.env.BASE_API_URL}/users`, {
		headers: {
			'Authorization': session?.user.accessToken as AxiosHeaderValue
		},
		withCredentials: true
	})

    return (
        <PrivateLayout>
            <section className='p-4 flex-1'>
                <h1 className="page-heading text-primary-500 dark:text-primary-400 mt-2">Open Charges Page</h1>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <ul>
					{
						users && Array.isArray(users) ? users?.map((user: any) => (
							<li key={user.id} className="flex flex-col my-4 bg-white dark:bg-slate-800 shadow-lg p-4 rounded-lg w-full max-w-[400px]">
								<span>Name: {user.name}</span>
								<span>Email: {user.email}</span>
								{
									user?.charges?.length > 0 ? (
										<>
											<strong className="mt-2">Charges:</strong>
											<ul>
												{
													user.charges.map((charge: any, idx: number) => (
														<li key={idx}>
															<span>{charge.title} </span>
															<span>${charge.totalAmount}</span>
														</li>
													))
												}
											</ul>
										</>
									) : null
								}
							</li>
						)) : null
					}
				</ul>
            </section>
        </PrivateLayout>
    )
}

export default OpenCharges
