"use client"

import React, { SetStateAction } from 'react'
import { IoCloseCircle, IoSearch } from 'react-icons/io5'

type TSearchProps = {
    searchValue: string
    setSearchValue: React.Dispatch<SetStateAction<string>>
}

const TableSearch = ({searchValue, setSearchValue}: TSearchProps) => {
    return (
        <div className="relative w-full">
            <input
                value={searchValue || ''}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                aria-label="search"
                placeholder="Search ..."
                className="input input-sm placeholder-slate-400 dark:placeholder-slate-500"
            />
            <IoCloseCircle
                className={`${!searchValue && 'hidden'} absolute top-[.72rem] right-10 text-slate-400 dark:text-slate-200 text-lg cursor-pointer`}
                onClick={() => setSearchValue('')}
            />
            <IoSearch className="absolute top-[.82rem] right-4 text-slate-400" />
        </div>
    )
}

export default TableSearch