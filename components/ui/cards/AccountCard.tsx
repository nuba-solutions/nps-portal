"use client"

import ChangeEmailButton from '@/components/buttons/ChangeEmailButton'
import { Session } from 'next-auth'
import React, { useState } from 'react'
import ChangeEmailModal from '../modals/ChangeEmailModal'

type TAccountCardProps = {
    session: Session
    dict: any
}

const AccountCard = ({session, dict} : TAccountCardProps) => {
    const { profile: profile_card_dictionary } = dict.pages.account.cards
    const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false)

    return (
        <>
            <div className='bg-white dark:bg-slate-800 rounded-lg md:rounded-xl w-full shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50 pb-4 overflow-clip'>
                <div className='bg-slate-200 dark:bg-slate-700 px-4 py-2 lg:py-3 flex flex-col border-b border-b-slate-300 dark:border-b-slate-600'>
                    <h2 className='text-base font-semibold'>{profile_card_dictionary.title}</h2>
                </div>

                <div className='px-4 pt-4 flex flex-col'>
                    <div className="flex flex-col">
                        <p className='font-semibold'>{profile_card_dictionary.full_name}</p>
                        <p className='text-slate-500 dark:text-slate-400'>{session?.user.name}</p>
                    </div>
                    <hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>
                    <div className="flex items-center justify-between gap-5">
                        <div className="flex flex-col">
                            <p className='font-semibold'>{profile_card_dictionary.email}</p>
                            <p className='text-slate-500 dark:text-slate-400'>{session?.user.email}</p>
                        </div>
                        <ChangeEmailButton setIsChangeEmailModalOpen={setIsChangeEmailModalOpen} label={profile_card_dictionary.edit_email_button}/>
                    </div>
                    <hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>
                    <div className="flex flex-col">
                        <p className='text-slate-500 dark:text-slate-400'>{profile_card_dictionary.footer}</p>
                    </div>
                </div>
            </div>
            <ChangeEmailModal
                isChangeEmailModalOpen={isChangeEmailModalOpen}
                setIsChangeEmailModalOpen={setIsChangeEmailModalOpen}
                session={session}
                closeModal={() => setIsChangeEmailModalOpen(false)}
            />
        </>
    )
}

export default AccountCard