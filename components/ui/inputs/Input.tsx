"use client"

import React from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

type TInputProps = {
    label?: string
    id: string
    disabled?: boolean
    sz?: 'xs' | 'sm' | 'lg' | 'xl'
    round?: boolean
    error?: FieldError | undefined
    name: string
    register?: UseFormRegister<any>
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = ({label, id, sz, error, round, name, register, ...rest}: TInputProps) => {
    let inputSizeClass, labelSizeClass = '';

    switch (sz) {
        case 'xs':
            inputSizeClass = 'h-[35px] text-xs';
            labelSizeClass = 'text-xs';
            break;
        case 'sm':
            inputSizeClass = 'h-[40px] text-sm';
            labelSizeClass = 'text-sm'
            break;
        case 'lg':
            inputSizeClass = 'h-[50px]';
            break;
        case 'xl':
            inputSizeClass = 'h-[60px] text-lg';
            labelSizeClass = 'text-lg'
            break;
        default:
            inputSizeClass = 'h-[45px]'
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
                    <input
                        id={id}
                        {...rest}
                        {...register(name)}
                        className={`${inputSizeClass} ${round ? 'rounded-full' : 'rounded-lg'} px-3 w-full bg-white dark:bg-slate-800 focus:ring-4 outline-0 border-2 disabled:opacity-50 ${error ? 'border-red-500 dark:border-red-500 text-red-500 ring-red-500/20' : 'border-slate-300 dark:border-slate-700 ring-blue-500/20 focus:border-blue-500 focus:dark:border-blue-500'}`} 
                    />
                ) : (
                    <input
                        id={id}
                        {...rest}
                        className={`${inputSizeClass} ${round ? 'rounded-full' : 'rounded-lg'} px-3 w-full bg-white dark:bg-slate-800 focus:ring-4 outline-0 border-2 disabled:opacity-50 ${error ? 'border-red-500 dark:border-red-500 text-red-500 ring-red-500/20' : 'border-slate-300 dark:border-slate-700 ring-blue-500/20 focus:border-blue-500 focus:dark:border-blue-500'}`} 
                    />
                )
            }
        </>
    )
}

export default Input