import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoClose } from 'react-icons/io5'
import Stripe from 'stripe'
import { formatAmountForDisplay } from '@/utils/stripe-helpers'
import ShareInvoiceForm from '@/components/forms/ShareInvoiceForm'

type TShareInvoiceModalProps = {
    isShareInvoiceModalOpen: boolean,
    setIsShareInvoiceModalOpen: Dispatch<SetStateAction<boolean>>,
    invoiceData: Partial<Stripe.Invoice>,
    closeModal: Dispatch<SetStateAction<boolean>>
}

const ShareInvoiceModal = ({ isShareInvoiceModalOpen, setIsShareInvoiceModalOpen, closeModal, invoiceData }: TShareInvoiceModalProps) => {

    return (
        <Transition appear show={isShareInvoiceModalOpen} as={Fragment}>
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
                                        Share invoice
                                    </Dialog.Title>
                                    <IoClose className='p-1 bg-slate-100 dark:bg-slate-600 rounded-full text-2xl hover:drop-shadow-xl cursor-pointer' onClick={closeModal}/>
                                </div>
                                <hr className='my-4 border border-slate-300 dark:border-slate-600'/>
                                <div className="mt-2 flex justify-between items-center">
                                    <div>
                                        <p className='font-semibold'>Invoice Number</p>
                                        <p># {invoiceData.number}</p>
                                    </div>
                                    <div className='flex flex-col items-end'>
                                        <p className='font-semibold'>Total</p>
                                        <p>{formatAmountForDisplay(invoiceData.amount_due as number / 100, "usd")}</p>
                                    </div>
                                </div>
                                <ShareInvoiceForm
                                    setIsShareInvoiceModalOpen={setIsShareInvoiceModalOpen}
                                    invoiceData={invoiceData}
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ShareInvoiceModal