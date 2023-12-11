import React from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

type TRadioButtonProps = {
    label?: string
    id: string
    disabled?: boolean
    sz?: 'xs' | 'sm' | 'lg' | 'xl'
    error?: FieldError | undefined
    register?: UseFormRegister<any>
} & React.InputHTMLAttributes<HTMLInputElement>

const RadioButton = ({label, id, sz, error, register, ...rest} : TRadioButtonProps) => {
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
                className={`mb-1 font-semibold whitespace-nowrap select-none cursor-pointer ${labelSizeClass}`}
                dangerouslySetInnerHTML={{__html: label as string}}
            ></label>
            {
                register ? (
                    <input
                        type='radio'
                        id={id}
                        {...rest}
                        {...register(id)}
                        className={`appearance-none w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-600 checked:bg-blue-500 checked:border-blue-500 checked:dark:bg-blue-500 checked:dark:border-blue-500 checked:content-radio-symbol focus:ring-4 ring-blue-500/20`}
                    />
                ) : (
                    <input
                        type='radio'
                        id={id}
                        {...rest}
                        className={`appearance-none w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-600 checked:bg-blue-500 checked:border-blue-500 checked:dark:bg-blue-500 checked:dark:border-blue-500 checked:content-radio-symbol focus:ring-4 ring-blue-500/20`}
                    />
                )
            }
        </>
    )
}

export default RadioButton