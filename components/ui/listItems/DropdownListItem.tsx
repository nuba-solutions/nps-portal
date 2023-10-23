import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SetStateAction } from 'react'

type TDropdownListItemProps = {
    onClick?: () => void | React.Dispatch<SetStateAction<boolean>>
    setIsSidebarOpen?: React.Dispatch<SetStateAction<boolean>>
    link?: string
    name: string
}

const DropdownListItem: React.FC<TDropdownListItemProps> = ({onClick, link, name, setIsSidebarOpen}) => {
    const path = usePathname()

    return (
        <li>
            {link ? (
                <Link
                    onClick={() => {
                        onClick;
                        setIsSidebarOpen ? setIsSidebarOpen(prev => !prev) : ''
                    }}
                    href={link}
                    className={`select-none cursor-pointer flex items-center py-3 pl-8 hover:bg-gray-200 dark:hover:bg-slate-600  ${path === `/${link}` ? 'bg-primary-500/20 text-primary-500' : 'text-slate-500 dark:text-slate-300'}`}
                >
                    {name}
                </Link>
            ) : (
                <span
                    onClick={onClick}
                    className={`select-none cursor-pointer flex items-center py-3 pl-8 hover:bg-gray-200 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-300`}
                >
                    {name}
                </span>
            )}
        </li>
    )
}

export default DropdownListItem