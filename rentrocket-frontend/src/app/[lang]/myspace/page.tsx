
import type { Metadata } from 'next'
import { AdminViewsStatBox } from '@/components/admin-layout/dashboard/AdminViewsStatBox'
import { AdminCommentsStatBox } from '@/components/admin-layout/dashboard/AdminCommentsStatBox'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { DashboardFlatsList } from '../../../app/[lang]/admin/dashboard/DashboardFlatsList'


export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}


	export default async function MySpacePage(){

	return (
			<>
		<div className='grid min-h-screen max-w-[1000px] mx-[30px]  lg:mx-auto lg:px-[30px]'>

		{/* <div className='flex flex-col text-white'> */}
			{/* <div className='flex flex-col lg:flex-row  items-center lg:justify-between'>
				<div className='w-[500px] my-3'>
					<AdminViewsStatBox header={true} chartName="Просмотры" />
				</div>
				<div className='w-[500px] my-3'>
					<AdminCommentsStatBox header={true}  chartName="Комментарии" />
				</div>
			</div> */}
			<DashboardFlatsList />
		</div>
		</>
	)
}
