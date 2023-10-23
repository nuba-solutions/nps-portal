"use client"

import React, { createContext, useContext, useEffect, useState } from "react";

const SidebarStateContext = createContext<any>({})

export const useSidebarState = () => useContext(SidebarStateContext)

export const SidebarStateContextProvider = ({children} : {children: React.ReactNode}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

    return (
        <SidebarStateContext.Provider value={{isSidebarOpen, setIsSidebarOpen}}>
            {children}
        </SidebarStateContext.Provider>
    )
}