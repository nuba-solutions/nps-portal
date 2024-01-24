import { useBackdropState } from '@/contexts/BackdropContext';
import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initialIsVisible: boolean | any, ref: any) {
    const { setIsBackdropVisible } = useBackdropState()
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
            setIsBackdropVisible(false)
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
}