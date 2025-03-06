// 'use client'
import React from 'react';
import { IFlatResponse } from '@/types/flat.types'
import { FlatHeader } from '@/components/ui/flat/FlatHeader'

export  function Flat({ flat }: { flat?: IFlatResponse }) {

    if (!flat) 
		return <div>Материал не найден</div>


	

	return (
		<div className=' lg:px-[30px]'>
			<FlatHeader flat={flat}/>
			<div className="xl:mx-auto flex flex-col">
			</div>
		</div>
	)
}

