'use client'
import React from 'react';
import { Flat } from '../Flat'
import { useFlat } from '../../myspace/flats/hooks/useFlat';
import Loader from '@/components/ui/Loader'
import { useEffect } from 'react';
import { Card } from "@heroui/react";

export default async function FlatPage({ params }: { params: Promise<{ flat: string }> }) {

	const { flat } = await params
	const { flat: flatEntity , isFlatSuccess, isFlatLoading } = useFlat(flat)


	return (
		<div className='max-w-[1000px] mx-auto'>
			{isFlatLoading && <Loader />}
			{isFlatSuccess && !flat &&

				<Card className="p-5 mt-5">
					<h1>Здесь ничего нет.</h1>
				</Card>
			}

				<Flat flat={flatEntity} />
		</div>
	)
}

