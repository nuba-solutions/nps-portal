import toast, { ToastPosition } from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';

type TNotify = {
    id?: string
    text: string
    position?: ToastPosition
    icon?: React.ReactElement
    iconColor?: 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'purple' | 'gray'
    title?: string
    closeable?: boolean
}

const notify = ({text, position, id, icon} : TNotify) => {
    return toast((text), {
        duration: 3000,
        position: position || "top-center",
        className: 'toaster',
        style: {padding: 15},
        icon: icon,
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    })
}

notify.success = ({text, position, id} : TNotify) => {
    return toast.success((text), {
        duration: 3000,
        position: position || "top-center",
        className: 'toaster',
        style: {padding: 15},
        id: id || undefined,
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        }
    })
}

notify.error = ({text, position, id} : TNotify) => {
    return toast.error((text), {
        duration: 3000,
        position: position || "top-center",
        className: 'toaster',
        style: {padding: 15},
        id: id || undefined,
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    })
}

notify.super = ({title, text, icon, position, closeable, iconColor, id}: TNotify) => {
    return toast((t) => (
        <span className='flex items-center gap-4'>
            {
                icon ? (
                    <span className={`${iconColor ? 'text-' + iconColor + '-500' : ''} text-2xl`}>
                        {icon}
                    </span>
                ) : null
            }
            <div className='flex flex-col'>
                <h2 className='font-semibold'>{title}</h2>
                <p className='text-sm'>{text}</p>
            </div>
            {
                closeable ? (
                    <button className='bg-slate-100 dark:bg-slate-800 p-2 rounded-md' onClick={() => toast.dismiss(id ? id : t.id)}>
                        <IoClose className='text-sm'/>
                    </button>
                ) : null
            }
        </span>
    ), {
        position: position || "top-center",
        className: 'toaster',
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });
}

notify.loading = ({text, position} : TNotify) => {
    return toast.loading((text), {
        duration: 3000,
        position: position || "top-center",
        className: 'toaster',
        style: {padding: 15},
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    })
}

notify.dismiss = ({id} : TNotify) => {
    return toast.dismiss(id)
}

export default notify
