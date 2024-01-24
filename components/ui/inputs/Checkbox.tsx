import React from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

type TCheckboxProps = {
    label?: string
    id: string
    disabled?: boolean
    sz?: 'xs' | 'sm' | 'lg' | 'xl'
    error?: FieldError | undefined
    name: string
    register?: UseFormRegister<any>
} & React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = ({label, id, sz, error, name, register, ...rest} : TCheckboxProps) => {
    let labelSizeClass = '';

    switch (sz) {
        case 'xs':
            labelSizeClass = 'text-xs';
            break;
        case 'sm':
            labelSizeClass = 'text-sm'
            break;
        case 'lg':
            labelSizeClass = '';
            break;
        case 'xl':
            labelSizeClass = 'text-lg'
            break;
        default:
            labelSizeClass = ''
            break;
    }

    return (
        <>
            <label
                htmlFor={id}
                className={`mb-1 font-semibold select-none cursor-pointer leading-6 ${labelSizeClass}`}
                dangerouslySetInnerHTML={{__html: label as string}}
            ></label>
            {
                register ? (
                    <input
                        type='checkbox'
                        id={id}
                        {...rest}
                        {...register(name)}
                        className={`appearance-none p-[6px] checked:p-0 w-4 h-4 rounded border-2 border-slate-300 dark:border-slate-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-600 checked:bg-blue-500 checked:border-blue-500 checked:dark:bg-blue-500 checked:dark:border-blue-500 checked:content-check-symbol focus:ring-4 ring-blue-500/20`}
                    />
                ) : (
                    <input
                        type='checkbox'
                        id={id}
                        {...rest}
                        className={`appearance-none p-[6px] checked:p-0 w-4 h-4 rounded border-2 border-slate-300 dark:border-slate-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-600 checked:bg-blue-500 checked:border-blue-500 checked:dark:bg-blue-500 checked:dark:border-blue-500 checked:content-check-symbol focus:ring-4 ring-blue-500/20`}
                    />
                )
            }
        </>
    )
}

export default Checkbox