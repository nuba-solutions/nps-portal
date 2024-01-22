"use client"

import React, { Dispatch, SetStateAction } from 'react'
import { IoBrush } from 'react-icons/io5'
import Button from '../ui/buttons/Button'

type TChangeEmailButtonProps = {
    setIsChangeEmailModalOpen: Dispatch<SetStateAction<boolean>>
    label: string
}

const ChangeEmailButton = ({setIsChangeEmailModalOpen, label}: TChangeEmailButtonProps) => {
    return (
        <div className='flex items-center gap-2'>
            <p className='font-semibold text-right hidden sm:block'>{label}</p>
            <Button
                sz='xs'
                variant='info'
                square
                onClick={() => setIsChangeEmailModalOpen(true)}
            >
                <IoBrush className="text-base"/>
                <span className='sr-only'>Change Email Address</span>
            </Button>
        </div>
    )
}

export default ChangeEmailButton