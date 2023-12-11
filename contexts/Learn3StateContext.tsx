"use client"

import React, { createContext, useContext, useEffect, useState } from "react";

const Learn3StateContext = createContext<any>({})

export const useLearn3State = () => useContext(Learn3StateContext)

export const Learn3StateContextProvider = ({children} : {children: React.ReactNode}) => {
    const [learn3Link, setLearn3Link] = useState<string>('')

    return (
        <Learn3StateContext.Provider value={{learn3Link, setLearn3Link}}>
            {children}
        </Learn3StateContext.Provider>
    )
}