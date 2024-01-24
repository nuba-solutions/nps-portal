"use client"

import React, { Dispatch, SetStateAction } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoCheckmarkCircle, IoMail } from 'react-icons/io5'
import notify from '@/utils/notify'
import Button from '@/components/ui/buttons/Button'
import InputGroup from '@/components/ui/inputs/InputGroup'
import Input from '@/components/ui/inputs/Input'
import { TChangeEmailSchema, changeEmailSchema } from '@/types/schemas/changeEmail'
import Checkbox from '../ui/inputs/Checkbox'
import { Session } from 'next-auth'
import { updateUserNotifications } from '@/utils/update_user'
import { signOut } from 'next-auth/react'
import { createNotification } from '@/utils/notification_helpers'
import { Locale } from '@/i18n.config'

type TChangeEmailFormProps = {
    setIsChangeEmailModalOpen: Dispatch<SetStateAction<boolean>>
    session: Session
	dict: any
}

const ChangeEmailForm = ({setIsChangeEmailModalOpen, session, dict}: TChangeEmailFormProps) => {
	const { change_email_modal: change_email_modal_dictionary } = dict.modals
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<TChangeEmailSchema>({
		resolver: zodResolver(changeEmailSchema)
	})

	const onSubmit = async (data: TChangeEmailSchema) => {
        const user: Partial<TUser> = {
            id: parseInt(session?.user.id),
            email: data.email as string,
            name: session?.user.name as string,
            notificationsEnabled: session?.user.notificationsEnabled,
            theme: session?.user.theme
        }

		const updatedUserData = await updateUserNotifications(session, user)

		if (!updatedUserData?.success) {
			setError("root", {
				type: 'server',
				message: change_email_modal_dictionary.form["error"]
			})
			notify.error({ text: change_email_modal_dictionary.form.notify["update_error"] })
			return
		}

        notify.super({ title: change_email_modal_dictionary.form.notify["update_success"],
			text: change_email_modal_dictionary.form.notify["logging_out_message"], icon: <IoCheckmarkCircle/>, iconColor: 'green' })

		setTimeout(() => {
			signOut({
				redirect: true,
				callbackUrl: "/"
			})
		}, 3000);

		setIsChangeEmailModalOpen(false)

		const notification: Partial<TNotification> = {
			userId: session?.user.id,
			title: change_email_modal_dictionary.form.notification_content["title"],
			description: change_email_modal_dictionary.form.notification_content["description"],
			subject: {
				prefix: change_email_modal_dictionary.form.notification_content["email_subject_prefix"],
				suffix: change_email_modal_dictionary.form.notification_content["email_subject_suffix"]
			}
		}
		await createNotification(session, notification)
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
					label={change_email_modal_dictionary.form["new_email_label"]}
					error={errors.email}
					placeholder={change_email_modal_dictionary.form["new_email_placeholder"]}
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
					label={change_email_modal_dictionary.form["consent_label"]}
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
                    {change_email_modal_dictionary.form["cancel_button"]}
                </Button>
                <Button
                    variant='info'
                    className="w-full md:w-fit"
					disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <AiOutlineLoading3Quarters className="spinner"/>
                            {change_email_modal_dictionary.form["confirm_button_submitting"]}
                        </>
                    ) : (
                        <>
                            <IoMail/>
                            {change_email_modal_dictionary.form["confirm_button_default"]}
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