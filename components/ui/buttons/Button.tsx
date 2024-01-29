"use client"

import Link from 'next/link'
import React, { MouseEvent } from 'react'

type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    sz?: 'xs' | 'sm' | 'lg' | 'xl'
    variant?: 'primary' | 'info' | 'destructive' | 'success' | 'warning' | 'muted' | 'light'
    outlined?: boolean
    round?: boolean
    circle?: boolean
    square?: boolean
    link?: string
    disabled?: boolean
    target?: string
    onClick?: (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = ({ variant, outlined, sz, children, className, round, square, circle, onClick, link, target, disabled, ...rest }: TButtonProps) => {
    let variantClass, sizeClass;
    switch (variant) {
        case 'primary':
            variantClass = outlined ? 'border-2 border-primary-500 bg-transparent text-primary-500 ring-primary-500/20 hover:border-primary-600 hover:text-primary-600' : 'bg-primary-500 text-white hover:bg-primary-600 focus-within:ring-4 ring-primary-500/50 active:bg-primary-700 active:ring-0'
            break;
        case 'info':
            variantClass = outlined ? 'border-2 border-blue-500 bg-transparent text-blue-500 ring-blue-500/20 hover:border-blue-600 hover:text-blue-600' : 'bg-blue-500 text-white hover:bg-blue-600 focus-within:ring-4 ring-blue-500/50 active:bg-blue-700 active:ring-0'
            break;
        case 'destructive':
            variantClass = outlined ? 'border-2 border-red-500 bg-transparent text-red-500 ring-red-500/20 hover:border-red-600 hover:text-red-600' : 'bg-red-500 text-white hover:bg-red-600 focus-within:ring-4 ring-red-500/50 active:bg-red-700 active:ring-0'
            break;
        case 'success':
            variantClass = outlined ? 'border-2 border-green-500 bg-transparent text-green-500 ring-green-500/20 hover:border-green-600 hover:text-green-600' : 'bg-green-500 text-white hover:bg-green-600 focus-within:ring-4 ring-green-500/50 active:bg-green-700 active:ring-0'
            break;
        case 'warning':
            variantClass = outlined ? 'border-2 border-yellow-500 bg-transparent text-yellow-500 ring-yellow-500/20 hover:border-yellow-600 hover:text-yellow-600' : 'bg-yellow-400 text-black hover:bg-yellow-500 focus-within:ring-4 ring-yellow-500/30 active:bg-yellow-600 active:text-white active:ring-0'
            break;
        case 'muted':
            variantClass = outlined ? 'border-2 border-slate-400 bg-transparent text-slate-400 focus-within:ring-4 ring-slate-500/20 hover:border-slate-500 hover:text-slate-500' : 'bg-slate-300 text-black hover:bg-slate-400 focus-within:ring-4 ring-slate-300/50 active:bg-slate-500 active:text-white active:ring-0'
            break;
        case 'light':
            variantClass = outlined ? 'border-2 border-slate-300 dark:border-slate-500 bg-transparent text-slate-300 dark:text-slate-500 ring-slate-600/20 dark:ring-white/30' : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 hover:dark:bg-slate-600 dark:text-white focus-within:ring-4 ring-slate-300/50 dark:ring-slate-500/50 active:ring-0'
            break;
        default:
            variantClass = outlined ? 'border-2 border-slate-600 dark:border-white bg-transparent text-slate-600 dark:text-white ring-slate-600/20 dark:ring-white/30' : 'bg-slate-600 dark:bg-white text-white dark:text-slate-600 focus-within:ring-4 ring-slate-600/50 dark:ring-white/50 active:ring-0'
            break;
    }

    switch (sz) {
        case 'xs':
            sizeClass = `${square || circle ? 'w-[35px]' : 'px-2'} h-[35px] text-xs`;
            break;
        case 'sm':
            sizeClass = `${square || circle ? 'w-[40px]' : 'px-3'} h-[40px] text-sm`;
            break;
        case 'lg':
            sizeClass = `${square || circle ? 'w-[50px]' : 'px-6'} h-[50px]`;
            break;
        case 'xl':
            sizeClass = `${square || circle ? 'w-[60px]' : 'px-8'} h-[60px] text-lg`;
            break;
        default:
            sizeClass = `${square || circle ? 'w-[45px]' : 'px-4'} h-[45px]`;
            break;
    }

    return link ? (
        <Link
            href={link}
            target={target}
            className={`${sizeClass} whitespace-nowrap shadow-lg flex items-center justify-center gap-2 outline-0 font-semibold ${variantClass} ${className} ${round || circle ? 'rounded-full' : 'rounded-lg'} ${disabled ? 'pointer-events-none opacity-50' : ''}`}
        >
            {children}
        </Link>
    ) : (
        <button
            onClick={onClick}
            disabled={disabled}
            {...rest}
            className={`${sizeClass} whitespace-nowrap shadow-lg flex items-center justify-center gap-2 outline-0 font-semibold ${variantClass} ${className} ${round || circle ? 'rounded-full' : 'rounded-lg'} ${disabled ? 'pointer-events-none opacity-50' : ''}`}
        >
            {children}
        </button>
    )
}

export default Button