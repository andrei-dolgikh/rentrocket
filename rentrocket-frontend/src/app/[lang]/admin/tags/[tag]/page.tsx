import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { CreateTag } from './CreateTag'
import { EditTag } from './EditTag'

export const metadata: Metadata = {
	title: 'Tag',
	...NO_INDEX_PAGE
}

export default function TagAdminPage({ params }: { params: { tag: string } }) {
	return (
		<div className='w-full h-full'>
			<div className="mx-[30px] lg:px-[30px] max-w-[1200px] xl:mx-auto flex flex-col">
				<div className=' py-[60px] w-1/2 m-auto'>
					{ (params.tag == "create") ? 
					<CreateTag /> : 
					<EditTag tag={params.tag} />}
				</div>
			</div>
		</div>
	)
}

