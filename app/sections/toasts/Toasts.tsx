"use client"

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
            <button className='btn btn-primary' onClick={() => notify({
                text: "Sample Notification"
            })}>
                Base Toast
            </button>

            <button className='btn btn-success' onClick={() => notify.success({
                text: "Success message!",
            })}>
                Success Toast
            </button>

            <button className='btn btn-destructive' onClick={() => notify.error({
                text: "Error message!",
            })}>
                Error Toast
            </button>

            <button className='btn btn-warning' onClick={() => notify.super({
                title: "Super Title",
                text: "Super toast message!",
                icon: <IoAperture/>,
                iconColor: "green",
                closeable: true
            })}>
                Super Toast
            </button>

            <button className='btn btn-info' onClick={() => getDummyData()}>
                Promise Toast
            </button>
        </div>
    )
}

export default Toasts