import React from 'react';
import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { CreateFlat } from './CreateFlat'
import { UpdateFlat } from './UpdateFlat'


export const metadata: Metadata = {
	title: 'Flat',
	...NO_INDEX_PAGE
}

export default async function FlatAdminPage({ params }: { 
	params: Promise<{ flat: string }> }) {

	const { flat } = await params

	return (
		<div className='w-full h-full '>
			<div className="flex flex-col">
					{ (flat == "new") ? 
					<CreateFlat /> : 
					<UpdateFlat flatId={flat}  />}
			</div>
		</div>
	)
}

