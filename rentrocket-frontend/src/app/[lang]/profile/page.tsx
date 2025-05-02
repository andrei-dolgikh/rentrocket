import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { ProfileCard } from '@/components/main/ProfileCard'

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
}

export default function SettingsPage() {
	return (
		<div className='grid min-h-screen mx-[30px] lg:mx-auto lg:px-[30px]'>
			<div className='my-5'>
			<ProfileCard />
			</div>
		</div>
	)
}
