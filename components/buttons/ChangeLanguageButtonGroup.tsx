"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const ChangeLanguageButtonGroup = ({dict}: any) => {
    const pathName = usePathname()

	const redirectedPathName = (locale: any) => {
		if (!pathName) return '/'
		const segments = pathName.split('/')
		segments[1] = locale
		return segments.join('/')
	}

    return (
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 ring-2 ring-slate-300 dark:ring-slate-600 rounded-lg px-1 py-1 max-h-[50px]">
            {
                dict.language.options.map((opt: any) => (
                    <Link
                        key={opt.locale}
                        href={redirectedPathName(opt.locale)}
                        className={`py-2 px-3 rounded-md font-semibold text-xs ${pathName.split('/')[1] === opt.locale ? 'bg-blue-500 text-white shadow-xl' : ''}`}
                    >
                        {opt.title}
                    </Link>
                ))
            }
        </div>
    )
}

export default ChangeLanguageButtonGroup