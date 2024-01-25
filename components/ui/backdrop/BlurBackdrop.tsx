"use client"

import { useBackdropState } from "@/contexts/BackdropContext"

const BlurBackdrop = () => {
    const { isBackdropVisible } = useBackdropState()
    return isBackdropVisible ? (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-all lg:hidden"></div>
    ) : null
}

export default BlurBackdrop