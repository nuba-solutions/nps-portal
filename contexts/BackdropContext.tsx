"use client"

import React, { createContext, useContext, useState } from "react";

const BackdropContext = createContext<any>({})

export const useBackdropState = () => useContext(BackdropContext)

export const BackdropContextProvider = ({children} : {children: React.ReactNode}) => {
    const [isBackdropVisible, setIsBackdropVisible] = useState<boolean>(false)

    return (
        <BackdropContext.Provider value={{isBackdropVisible, setIsBackdropVisible}}>
            {children}
        </BackdropContext.Provider>
    )
}