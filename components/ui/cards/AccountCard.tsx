"use client"

import ChangeEmailButton from '@/components/buttons/ChangeEmailButton'
import { Session } from 'next-auth'
import React, { useState } from 'react'
import ChangeEmailModal from '../modals/ChangeEmailModal'

type TAccountCardProps = {
    session: Session
}

const AccountCard = ({session} : TAccountCardProps) => {
    const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false)

    return (
        <>
            <div className='bg-white dark:bg-slate-800 rounded-lg md:rounded-xl w-full shadow-xl shadow-slate-400/10 dark:shadow-slate-950/50 pb-4 overflow-clip'>
                <div className='bg-slate-200 dark:bg-slate-700 px-4 py-2 lg:py-3 flex flex-col border-b border-b-slate-300 dark:border-b-slate-600'>
                    <h2 className='text-base font-semibold'>Profile</h2>
                </div>

                <div className='px-4 pt-4 flex flex-col'>
                    <div className="flex flex-col">
                        <p className='font-semibold'>Full Name</p>
                        <p className='text-slate-500 dark:text-slate-400'>{session?.user.name}</p>
                    </div>
                    <hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>
                    <div className="flex items-center justify-between gap-5">
                        <div className="flex flex-col">
                            <p className='font-semibold'>Email</p>
                            <p className='text-slate-500 dark:text-slate-400'>{session?.user.email}</p>
                        </div>
                        <ChangeEmailButton setIsChangeEmailModalOpen={setIsChangeEmailModalOpen}/>
                    </div>
                    <hr className="h-px my-4 border-gray-200 dark:border-slate-700"></hr>
                    <div className="flex flex-col">
                        <p className='text-slate-500 dark:text-slate-400'>If you wish to change your email address to a new one, feel free to do so. You will receive a confirmation message afterwards.</p>
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