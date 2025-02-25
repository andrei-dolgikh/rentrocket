'use client'
import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { FlatsFeed } from '@/components/ui/flat/FlatsFeed'
import { Link } from '@nextui-org/react'
import { useFlats } from './hooks/useFlats'

export default function FlatPage() {
	const {flats} = useFlats();
	return (
		<div>
			
			<Link href={'/admin/flats/new'}>
                            <div className={`text-[22px] lg:text-[26px] mt-5 text-black`}>
                               Создать квартиру
                            </div>
                        </Link>
						<FlatsFeed flats={flats}/>
		</div>
	)
}
