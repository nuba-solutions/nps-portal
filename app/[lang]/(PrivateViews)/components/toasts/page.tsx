import Toasts from '@/components/sections/toasts/Toasts';
import PrivateLayout from '../../_layout';
import PageHeading from '@/components/ui/headings/PageHeading';

const page = async () => {
    return (
        <PrivateLayout>
            <section className="p-4 pb-20 flex-1">
                <PageHeading description='Internal use' title='Toasts'/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <div className='flex flex-col md:flex-row md:gap-2'>
                    <Toasts/>
                </div>
            </section>
        </PrivateLayout>
    )
}

export default page