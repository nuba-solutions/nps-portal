"use client"

import React, { SetStateAction } from 'react'
import { IoSearch } from 'react-icons/io5'

type TSearchProps = {
    searchValue: string
    setSearchValue: React.Dispatch<SetStateAction<string>>
}

const TableSearch = ({searchValue, setSearchValue}: TSearchProps) => {
    return (
        <div className="relative w-fit">
            <input
                value={searchValue || ''}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                aria-label="search"
                placeholder="Search ..."
                className="input placeholder-slate-400 dark:placeholder-slate-500"
            />
            <IoSearch className="absolute top-4 right-4 text-slate-400" />
        </div>
    )
}

export default TableSearch