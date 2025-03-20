import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Profile } from './Profile'

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
}

export default function SettingsPage() {
	return (
		<div className='w-full h-full'>
			<div className="mx-[30px] lg:px-[30px] max-w-[1200px] xl:mx-auto flex flex-col">
			<Profile />
		</div>
		</div>
	)
}
