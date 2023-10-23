"use client"

import { useState, useEffect } from "react";

type TWindow = {
    width: number
    height: number
}

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState<TWindow>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        // only execute all the code below in client side
        if (typeof window !== 'undefined') {
            // handler to call on window resize
            const handleResize = () => {
                // set window width/height to state
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }

            // add event listener
            window.addEventListener("resize", handleResize);

            // call handler right away so state gets updated with initial window size
            handleResize();

            // remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }
        }, []); // empty array ensures that effect is only run on mount
        return windowSize;
  }