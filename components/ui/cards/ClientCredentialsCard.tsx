"use client"

import CreateClientCredentialsButton from '@/components/buttons/CreateClientCredentialsButton'
import { createClientCredentials } from '@/query_functions/client_credentials'
import { useQuery } from '@tanstack/react-query'
import { Session } from 'next-auth'
import React, { useState } from 'react'
import CreateClientCredentialsModal from '../modals/CreateClientCredentialsModal'

type TClientCredentialsCardProps = {
    session: Session
    dict: any
}

const ClientCredentialsCard = ({session, dict} : TClientCredentialsCardProps) => {
    const { client_credentials: client_credentials_card_dictionary } = dict.pages.account.cards
    const [isCreateClientCredentialsModalOpen, setIsCreateClientCredentialsModalOpen] = useState(false)

	const { data: clientCredentials, isFetching, refetch } = useQuery({
        queryKey: ['create_client_credentials'],
        throwOnError: true,
        queryFn: () => createClientCredentials({user_id: session.user.id, client_provider_id: session.user.client_provider as any}),
        enabled: false
    })

    if (session.user.role !== 'ADMIN' && session?.user.role !== 'MASTER')
        return null

    return (
        <>
            <div className="bg-white dark:bg-slate-800 rounded-lg md:rounded-xl w-full shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50 pb-4 overflow-clip">
                <div className='bg-slate-200 dark:bg-slate-700 px-4 py-2 lg:py-3 flex flex-col border-b border-b-slate-300 dark:border-b-slate-600'>
                    <h2 className='text-base font-semibold'>{client_credentials_card_dictionary[ 'title']}</h2>
                </div>

                <div className='px-4 pt-4 flex flex-col'>
                    <div className="flex items-center justify-between gap-5">
                        <div className="flex flex-col">
                            <p className='font-semibold'>{client_credentials_card_dictionary[ 'main_text']}</p>
                            <p className='text-slate-500 dark:text-slate-400'>{client_credentials_card_dictionary['sub_text']}</p>
                        </div>
                        <CreateClientCredentialsButton setIsCreateClientCredentialsModalOpen={setIsCreateClientCredentialsModalOpen} refetch={refetch} label={client_credentials_card_dictionary["create_client_credentials_button"]}/>
                    </div>
                    <hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>
                    <div className="flex flex-col">
                        <p className='text-slate-500 dark:text-slate-400'>{client_credentials_card_dictionary['footer']}</p>
                    </div>
                </div>
            </div>

            <CreateClientCredentialsModal
                isCreateClientCredentialsModalOpen={isCreateClientCredentialsModalOpen}
                setIsCreateClientCredentialsModalOpen={setIsCreateClientCredentialsModalOpen}
                session={session}
                dict={dict}
                data={clientCredentials}
                isFetching={isFetching}
                closeModal={() => setIsCreateClientCredentialsModalOpen(false)}
            />
        </>
    )
}

export default ClientCredentialsCard

