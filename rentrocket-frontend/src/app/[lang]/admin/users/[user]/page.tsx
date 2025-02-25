import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { CreateUser } from './CreateUser'
import { EditUser } from './EditUser'

export const metadata: Metadata = {
	title: 'User',
	...NO_INDEX_PAGE
}

export default function UserAdminPage({ params }: { params: { user: string } }) {
	return (
		<div className='w-full h-full'>
			<div className="mx-[30px] lg:px-[30px] max-w-[1200px] xl:mx-auto flex flex-col">
				<div className=' py-[60px] w-1/2 m-auto'>
					{ (params.user == "create") ? 
					<CreateUser /> : 
					<EditUser user={params.user} />}
				</div>
			</div>
		</div>
	)
}

