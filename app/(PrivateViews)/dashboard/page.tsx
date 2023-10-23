import PrivateLayout from "../_layout";

export default async function DashboardPage() {

	return (
		<PrivateLayout>
			<section className="p-4 flex-1">
				<h1 className="page-heading text-primary-500 dark:text-primary-400 mt-2">Dashboard Page</h1>
				<hr className='h-px my-4 bg-slate-200 border-0 dark:bg-slate-700'/>
			</section>
		</PrivateLayout>
	)
}
