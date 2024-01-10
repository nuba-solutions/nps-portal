"use client"

import React, { Dispatch, SetStateAction } from 'react'
import { IoBrush } from 'react-icons/io5'

type TChangeEmailButtonProps = {
    setIsChangeEmailModalOpen: Dispatch<SetStateAction<boolean>>
}

const ChangeEmailButton = ({setIsChangeEmailModalOpen}: TChangeEmailButtonProps) => {
    return (
        <div className='flex items-center gap-2'>
            <p className='font-semibold text-right'>Edit email</p>
            <button
                className='flex items-center justify-center w-[35px] h-[35px] rounded-lg bg-slate-200 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:text-primary-500 hover:dark:text-white disabled:pointer-events-none disabled:opacity-50'
                onClick={() => setIsChangeEmailModalOpen(true)}
            >
                <IoBrush />
                <span className='sr-only'>Change Email Address</span>
            </button>
        </div>
    )
}

export default ChangeEmailButton