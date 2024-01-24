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
        <div className="flex items-center justify-around gap-2 bg-slate-100 dark:bg-slate-700 ring-2 ring-slate-300 dark:ring-slate-600 rounded-lg px-1 py-1 max-h-[50px]">
            {
                dict.language.options.map((opt: any) => opt.locale.split("-").length < 2 ? (
                        <Link
                            key={opt.locale}
                            href={redirectedPathName(opt.locale)}
                            className={`py-2 px-3 w-full text-center rounded-md font-semibold text-xs ${pathName.split('/')[1].split("-")[0] === opt.locale ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-xl' : ''}`}
                        >
                            {opt.title}
                        </Link>
                    ) : null
                )
            }
        </div>
    )
}

export default ChangeLanguageButtonGroup