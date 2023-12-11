import { IoAmericanFootball, IoApps, IoBuild, IoCard, IoDocumentText, IoEye, IoFitness, IoMail, IoMedical, IoPizza, IoWine } from 'react-icons/io5'

export const getSidebarLeftIcon = (url: string) => {
    switch (url) {
        case '/dashboard':
            return <IoApps/>
        case '/charges/open':
            return <IoCard/>
        case '/charges/history':
            return <IoDocumentText/>
        case '/messages':
            return <IoMail/>
        case '/preferences':
            return <IoBuild/>
        case '/ptsd-claims':
            return <IoMedical/>
        case '/eye-conditions':
            return <IoEye/>
        case '/respiratory-system':
            return <IoFitness/>
        case '/components/buttons':
            return <IoPizza/>
        case '/components/inputs':
            return <IoAmericanFootball/>
        case '/components/toasts':
            return <IoWine/>
    }
}