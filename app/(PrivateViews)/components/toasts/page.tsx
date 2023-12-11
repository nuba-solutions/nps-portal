import Toasts from '@/app/sections/toasts/Toasts';
import PrivateLayout from '../../_layout';
import PageHeading from '@/components/ui/headings/PageHeading';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getClientProviderPageInfo } from '@/utils/theme_providers';

const page = async () => {
    const session = await getServerSession(authOptions)
    const page = await getClientProviderPageInfo(session?.user.client_provider, 'components/toasts')

    return (
        <PrivateLayout>
            <section className="p-4 pb-20 flex-1">
                <PageHeading description={page?.page_info.description || 'Page description'} title={page?.page_info.title || 'Page Title'}/>
                <hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>

                <div className='flex flex-col md:flex-row md:gap-2'>
                    <Toasts/>
                </div>
            </section>
        </PrivateLayout>
    )
}

export default page