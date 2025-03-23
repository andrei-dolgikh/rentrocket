'use client'
import React from 'react';
import { Flat } from '../Flat'
import { useFlat } from '../../admin/flats/hooks/useFlat';
import Loader from '@/components/ui/Loader'
import { useEffect } from 'react';
import { Card } from "@heroui/react";

export default function FlatPage({ params }: { params: { flat: string } }) {
	const { flat, isFlatSuccess, isFlatLoading } = useFlat(params.flat)


	return (
		<div className='max-w-[1000px] mx-auto'>
			{isFlatLoading && <Loader />}
			{isFlatSuccess && !flat &&

				<Card className="p-5 mt-5">
					<h1>Здесь ничего нет.</h1>
				</Card>
			}

				<Flat flat={flat} />
		</div>
	)
}

