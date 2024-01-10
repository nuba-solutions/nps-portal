import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoClose } from 'react-icons/io5'
import ChangeEmailForm from '@/components/forms/ChangeEmailForm'
import { Session } from 'next-auth'

type TChangeEmailModalProps = {
    isChangeEmailModalOpen: boolean,
    setIsChangeEmailModalOpen: Dispatch<SetStateAction<boolean>>,
    closeModal: Dispatch<SetStateAction<boolean>>
    session: Session
}

const ChangeEmailModal = ({ isChangeEmailModalOpen, setIsChangeEmailModalOpen, closeModal, session }: TChangeEmailModalProps) => {

    return (
        <Transition appear show={isChangeEmailModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-700 p-6 text-left align-middle shadow-xl transition-all">
                                <div className='flex items-center justify-between'>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6"
                                    >
                                        Change Email
                                    </Dialog.Title>
                                    <IoClose className='p-1 bg-slate-100 dark:bg-slate-600 rounded-full text-2xl hover:drop-shadow-xl cursor-pointer' onClick={closeModal}/>
                                </div>
                                <hr className='my-4 border border-slate-300 dark:border-slate-600'/>
                                <div className="mt-2 flex flex-col">
                                    <div>
                                        <p className='font-semibold'>Name</p>
                                        <p>{session?.user.name}</p>
                                    </div>
                                    <hr className='my-4 border border-slate-300 dark:border-slate-600'/>
                                    <div>
                                        <p className='font-semibold'>Current Email</p>
                                        <p>{session?.user.email}</p>
                                    </div>
                                </div>
                                <ChangeEmailForm
                                    setIsChangeEmailModalOpen={setIsChangeEmailModalOpen}
                                    session={session as Session}
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ChangeEmailModal