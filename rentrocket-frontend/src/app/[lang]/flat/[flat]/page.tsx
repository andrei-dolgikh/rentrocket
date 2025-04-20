import React from 'react';
import { Flat } from '../Flat'

export default async function FlatPage({ params }: { params: Promise<{ flat: string }> }) {
	const { flat } = await params
	return (
		<div className='max-w-[1000px] mx-auto'>

				<Flat flatId={flat} />
		</div>
	)
}

