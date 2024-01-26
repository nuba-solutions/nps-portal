"use client"

import useComponentVisible from "@/hooks/useClickOutside";
import React, { createContext, useContext, useRef, useState } from "react";
import { useBackdropState } from "./BackdropContext";

const SidebarStateContext = createContext<any>({})

export const useSidebarState = () => useContext(SidebarStateContext)

export const SidebarStateContextProvider = ({children} : {children: React.ReactNode}) => {
    const sideBarRef = useRef<any>()
	const {
		isComponentVisible,
		setIsComponentVisible
	} = useComponentVisible(false, sideBarRef)

    const { isBackdropVisible, setIsBackdropVisible } = useBackdropState()

    return (
        <SidebarStateContext.Provider value={{isComponentVisible, setIsComponentVisible, sideBarRef, isBackdropVisible, setIsBackdropVisible}}>
            {children}
        </SidebarStateContext.Provider>
    )
}