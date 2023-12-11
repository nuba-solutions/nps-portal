import React from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

type TTextAreaProps = {
    label?: string
    id: string
    disabled?: boolean
    sz?: 'xs' | 'sm' | 'lg' | 'xl'
    error?: FieldError | undefined
    name: string
    register?: UseFormRegister<any>
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea = ({label, id, sz, error, name, register, ...rest}: TTextAreaProps) => {
    let labelSizeClass = '';

    switch (sz) {
        case 'xs':
            labelSizeClass = 'text-xs';
            break;
        case 'sm':
            labelSizeClass = 'text-sm'
            break;
        case 'lg':
            labelSizeClass = 'text-normal';
            break;
        case 'xl':
            labelSizeClass = 'text-lg'
            break;
        default:
            labelSizeClass = 'text-normal'
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
                    <textarea
                        id={id}
                        {...rest}
                        {...register(name)}
                        className={`resize-none rounded-lg p-3 w-full bg-white dark:bg-slate-800 focus:ring-4 outline-0 border-2 disabled:opacity-50 ${error ? 'border-red-500 dark:border-red-500 text-red-500 ring-red-500/20' : 'border-slate-300 dark:border-slate-700 ring-blue-500/20 focus:border-blue-500 focus:dark:border-blue-500'}`}
                    />
                ) : (
                    <textarea
                        id={id}
                        {...rest}
                        className={`resize-none rounded-lg p-3 w-full bg-white dark:bg-slate-800 focus:ring-4 outline-0 border-2 disabled:opacity-50 ${error ? 'border-red-500 dark:border-red-500 text-red-500 ring-red-500/20' : 'border-slate-300 dark:border-slate-700 ring-blue-500/20 focus:border-blue-500 focus:dark:border-blue-500'}`}
                    />
                )
            }
        </>
    )
}

export default TextArea