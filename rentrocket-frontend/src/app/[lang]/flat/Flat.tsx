'use client'
import React from 'react';
import { useFlat } from '@/hooks/flats/useFlat';
import Loader from '@/components/Loader'
import { Card } from "@heroui/react";
import { FlatHeader } from '@/components/flat/FlatHeader'

export function Flat({ flatId }: { flatId?: string }) {
	if (!flatId) return <div>Квартира не найдена</div>


	const { flat, isFlatSuccess, isFlatLoading } = useFlat(flatId)
	if (!flat)
		return <div>Квартира не найдена</div>

	return (
		<div className=' lg:px-[30px]'>
			{isFlatLoading && <Loader />}
			{isFlatSuccess && !flat &&

				<Card className="p-5 mt-5">
					<h1>Здесь ничего нет.</h1>
				</Card>
			}
			<FlatHeader flat={flat} />
			<div className="xl:mx-auto flex flex-col">
			</div>
		</div>
	)
}

