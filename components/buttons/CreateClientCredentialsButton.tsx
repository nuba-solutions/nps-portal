"use client"

import React, { Dispatch, SetStateAction } from 'react'
import Button from '../ui/buttons/Button'

type TCreateClientCredentialsButtonProps = {
    setIsCreateClientCredentialsModalOpen: Dispatch<SetStateAction<boolean>>
    refetch: Function
    label: string
}

const CreateClientCredentialsButton = ({setIsCreateClientCredentialsModalOpen, refetch, label}: TCreateClientCredentialsButtonProps) => {
    return (
        <div className='flex items-center gap-2'>
            <p className='font-semibold text-right hidden sm:block'>{label}</p>
            <Button
                sz='xs'
                variant='info'
                className="py-2 px-3 w-full text-center rounded-md font-semibold text-xs bg-blue-500 hover:bg-blue-600 text-white shadow-xl"
                onClick={() => {
                    setIsCreateClientCredentialsModalOpen(true)
                    refetch()
                }}
            >
                <span className='sr-only'>{label}</span>
                <span>{label}</span>
            </Button>
        </div>
    )
}

export default CreateClientCredentialsButton