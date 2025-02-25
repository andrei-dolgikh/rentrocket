import React from 'react';
import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { CreateFlat } from './CreateFlat'
import { UpdateFlat } from './UpdateFlat'


export const metadata: Metadata = {
	title: 'Flat',
	...NO_INDEX_PAGE
}

export default function FlatAdminPage({ params }: { params: { flat: string, category: string } }) {
	return (
		<div className='w-full h-full '>
			<div className="max-w-[1200px] xl:mx-auto flex flex-col">
					{ (params.flat == "new") ? 
					<CreateFlat /> : 
					<UpdateFlat flatId={params.flat}  />}
			</div>
		</div>
	)
}

