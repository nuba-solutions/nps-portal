"use client"

import Button from '@/components/ui/buttons/Button'
import notify from '@/utils/notify'
import React from 'react'
import { IoAperture} from 'react-icons/io5'

const Toasts = () => {
    const getDummyData = async () => {
        const toastId = notify.loading({text: 'Getting data from server'})

        setTimeout(async () => {
            try {
                notify.success({
                    text: 'Data acquired successfully!',
                    id: toastId
                })
            } catch (error) {
                notify.error({
                    text: 'Something went wrong!',
                    id: toastId
                })
            }
        }, 3000);
    }

    return (
        <div className='flex items-center gap-4'>
            <Button variant='primary' onClick={() => notify({
                text: "Sample Notification"
            })}>
                Base Toast
            </Button>

            <Button variant='success' onClick={() => notify.success({
                text: "Success message!",
            })}>
                Success Toast
            </Button>

            <Button variant='destructive' onClick={() => notify.error({
                text: "Error message!",
            })}>
                Error Toast
            </Button>

            <Button variant='warning' onClick={() => notify.super({
                title: "Super Title",
                text: "Super toast message!",
                icon: <IoAperture/>,
                iconColor: "green",
                closeable: true
            })}>
                Super Toast
            </Button>

            <Button variant='info' onClick={() => getDummyData()}>
                Promise Toast
            </Button>
        </div>
    )
}

export default Toasts