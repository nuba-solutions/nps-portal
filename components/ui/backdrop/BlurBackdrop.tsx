"use client"

import { useBackdropState } from "@/contexts/BackdropContext"

const BlurBackdrop = () => {
    const { isBackdropVisible } = useBackdropState()
    return isBackdropVisible ? (
        <div className='backdrop-blur-sm bg-blend-color-burn min-h-screen w-full top-0 fixed transition-all lg:hidden'></div>
    ) : null
}

export default BlurBackdrop