import { IoAmericanFootball, IoApps, IoBook, IoBuild, IoCard, IoDocumentText, IoEye, IoFitness, IoMail, IoMan, IoMedical, IoPizza, IoWine } from 'react-icons/io5'

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
        case '/profile':
            return <IoMan/>
        case '/ptsd-claims':
            return <IoMedical/>
        case '/eye-conditions':
            return <IoEye/>
        case '/respiratory-system':
            return <IoFitness/>
        case '/introduction':
            return<IoBook/>
        case '/components/buttons':
            return <IoPizza/>
        case '/components/inputs':
            return <IoAmericanFootball/>
        case '/components/toasts':
            return <IoWine/>
    }
}