"use client"

import React from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

type TSelectProps = {
    label?: string
    id?: string
    sz?: 'xs' | 'sm' | 'lg' | 'xl'
    round?: boolean
    error?: FieldError | undefined
    children?: React.ReactNode
    name: string
    register?: UseFormRegister<any>
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = ({label, id, sz, error, round, name, register, children, ...rest}: TSelectProps) => {
    let inputSizeClass, labelSizeClass, optionSizeClass = '';

    switch (sz) {
        case 'xs':
            inputSizeClass = 'h-[35px] text-xs';
            labelSizeClass = 'text-xs';
            optionSizeClass = 'py-2 text-xs';
            break;
        case 'sm':
            inputSizeClass = 'h-[40px] text-sm';
            labelSizeClass = 'text-sm';
            optionSizeClass = 'py-2 text-sm';
            break;
        case 'lg':
            inputSizeClass = 'h-[50px]';
            optionSizeClass = 'py-3';
            break;
        case 'xl':
            inputSizeClass = 'h-[60px] text-lg';
            labelSizeClass = 'text-lg';
            optionSizeClass = 'py-4 text-lg';
            break;
        default:
            inputSizeClass = 'h-[45px]'
            optionSizeClass = 'py-3';
            break;
    }

    return (
        <>
            <label
                htmlFor={id}
                className={`mb-2 font-semibold whitespace-nowrap ${labelSizeClass}`}
            >
                {label}
            </label>
            {
                register ? (
                    <select
                        id={id}
                        {...rest}
                        {...register(name)}
                        className={`${inputSizeClass} ${round ? 'rounded-full' : 'rounded-lg'} px-3 w-full bg-white dark:bg-slate-800 focus:ring-4 outline-0 border-2 disabled:opacity-50 ${error ? 'border-red-500 dark:border-red-500 text-red-500 ring-red-500/20' : 'border-slate-300 dark:border-slate-700 ring-blue-500/20 focus:border-blue-500 focus:dark:border-blue-500'}`}
                    >
                        {children}
                    </select>
                ) : (
                    <select
                        id={id}
                        {...rest}
                        className={`${inputSizeClass} ${round ? 'rounded-full' : 'rounded-lg'} px-3 w-full bg-white dark:bg-slate-800 focus:ring-4 outline-0 border-2 disabled:opacity-50 ${error ? 'border-red-500 dark:border-red-500 text-red-500 ring-red-500/20' : 'border-slate-300 dark:border-slate-700 ring-blue-500/20 focus:border-blue-500 focus:dark:border-blue-500'}`}
                    >
                        {children}
                    </select>
                )
            }
        </>
    )
}

export default Select