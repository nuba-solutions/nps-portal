"use client"

import React, { Dispatch, SetStateAction, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoCheckmarkCircle, IoMail } from 'react-icons/io5'
import axios from 'axios'
import notify from '@/utils/notify'
import Button from '@/components/ui/buttons/Button'
import InputGroup from '@/components/ui/inputs/InputGroup'
import Input from '@/components/ui/inputs/Input'
import { TChangeEmailSchema, changeEmailSchema } from '@/types/schemas/changeEmail'
import Checkbox from '../ui/inputs/Checkbox'
import { Session } from 'next-auth'
import { updateUserNotifications } from '@/utils/update_user'
import { signOut } from 'next-auth/react'

type TChangeEmailFormProps = {
    setIsChangeEmailModalOpen: Dispatch<SetStateAction<boolean>>
    session: Session
}

const ChangeEmailForm = ({setIsChangeEmailModalOpen, session}: TChangeEmailFormProps) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<TChangeEmailSchema>({
		resolver: zodResolver(changeEmailSchema)
	})

    // const handleUpdateUserEmail = async (data: TChangeEmailSchema) => {
    //     setIsUpdating(true)

    //     const data: Partial<TUser> = {
    //         id: parseInt(session?.user.id),
    //         email: session?.user.email as string,
    //         name: session?.user.name as string,
    //         notificationsEnabled: session?.user.notificationsEnabled,
    //         theme: session?.user.theme
    //     }

    //     const updatedUser = await updateUserNotifications(session, data)

        // await update({
        //     ...session,
        //     user: {
        //         ...session?.user,
        //         notificationsEnabled: updatedUser.data.notificationsEnabled,
        //     }
        // }).then(() => {
        //     window.location.reload()
        //     setIsUpdating(false)
        // })
    // }

	const onSubmit = async (data: TChangeEmailSchema) => {

        const user: Partial<TUser> = {
            id: parseInt(session?.user.id),
            email: data.email as string,
            name: session?.user.name as string,
            notificationsEnabled: session?.user.notificationsEnabled,
            theme: session?.user.theme
        }

		const updatedUserData = await updateUserNotifications(session, user)
        console.log(updatedUserData)

		if (!updatedUserData?.success) {
			setError("root", {
				type: 'server',
				message: 'Could not update email!'
			})
			notify.error({ text: "Could not update email!" })
			return
		}

        notify.super({ title: "Email Updated!", text: "Logging you out in 3 seconds", icon: <IoCheckmarkCircle/>, iconColor: 'green' })

        setTimeout(() => {
            signOut({
				redirect: true,
				callbackUrl: "/"
			})
        }, 3000);

		setIsChangeEmailModalOpen(false)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
		>
            <hr className='my-4 border border-slate-300 dark:border-slate-600'/>
			<InputGroup className='mt-6'>
				<Input
					type="email"
					id="share-invoice-email"
					name="email"
					label="New Email"
					error={errors.email}
					placeholder='email@example.com'
					register={register}
				/>
			</InputGroup>
			{
				errors.email ? (
					<p className='text-red-500 mt-2'>{`${errors.email.message}`}</p>
				) : null
			}
			<InputGroup inline reverse leading className='mt-5'>
				<Checkbox
					id='share-invoice-checkbox'
					name="consent"
					register={register}
					label={`I am aware that changing this email will <br/>
					        replace the current in my account and will <br/>
                            log me out of the system.`}
				/>
			</InputGroup>
			{
				errors.consent ? (
					<p className='text-red-500 mt-2'>{`${errors.consent.message}`}</p>
				) : null
			}

            <hr className='my-4 border border-slate-300 dark:border-slate-600'/>
            <div className="mt-4 flex flex-col-reverse gap-4 md:gap-0 md:flex-row items-center justify-between">
                <Button
					outlined
                    className="w-full md:w-fit"
                    onClick={(e) => {
                        e.preventDefault()
                        setIsChangeEmailModalOpen(false)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant='info'
                    className="w-full md:w-fit"
					disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <AiOutlineLoading3Quarters className="spinner"/>
                            Sharing
                        </>
                    ) : (
                        <>
                            <IoMail/>
                            Confirm Change Email
                        </>
                        )
                    }
                </Button>
            </div>
			{
				errors.root ? (
					<p className='text-red-500 mt-6 bg-red-500/20 py-4 px-6 rounded-lg text-center'>{`${errors.root.message}`}</p>
				) : null
			}
		</form>
	)
}

export default ChangeEmailForm