import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Tags } from './Tags'


export const metadata: Metadata = {
	title: 'Tags',
	...NO_INDEX_PAGE
}

export default function TagsPage() {
	return (
		<>
		<Tags />
		</>
	)
}
