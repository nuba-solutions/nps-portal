import Toasts from '@/app/sections/toasts/Toasts';
import PrivateLayout from '../../_layout';
import PageHeading from '@/components/ui/headings/PageHeading';

const page = () => {

    return (
        <PrivateLayout>
            <section className="p-4 pb-20 flex-1">
                <PageHeading title='Components' subtitle='Toast types and usage'/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <div className='flex flex-col md:flex-row md:gap-2'>
                    <Toasts/>
                </div>
            </section>
        </PrivateLayout>
    )
}

export default page