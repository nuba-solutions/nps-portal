import PageHeading from "@/components/ui/headings/PageHeading";
import PrivateLayout from "../_layout";

export default async function DashboardPage() {

	return (
		<PrivateLayout>
			<section className="p-4 flex-1">
				<PageHeading title='Dashboard' subtitle='Welcome to Nvoicex'/>
				<hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>
			</section>
		</PrivateLayout>
	)
}
