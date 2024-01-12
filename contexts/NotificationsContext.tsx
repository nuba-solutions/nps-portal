"use client"

import React, { createContext, useContext, useEffect, useState } from "react";

const NotificationsStateContext = createContext<any>({})

export const useNotificationsContext = () => useContext(NotificationsStateContext)

export const NotificationsStateContextProvider = ({children} : {children: React.ReactNode}) => {
    const [notificationsCount, setNotificationsCount] = useState<number>(0)

    return (
        <NotificationsStateContext.Provider value={{notificationsCount, setNotificationsCount}}>
            {children}
        </NotificationsStateContext.Provider>
    )
}