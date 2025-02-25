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
				<div className='lg:text-[32px] text-[18px] text-white mb-4 mx-[30px] lg:mx-[0px] mt-[20px] '>Отзывы  <span className='text-[16px]'>{flat.rating} <span className='text-[#999999]'>/ 10</span></span></div>				
			</div>
		</div>
	)
}

