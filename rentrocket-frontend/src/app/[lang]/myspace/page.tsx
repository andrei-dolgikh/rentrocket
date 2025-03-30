'use client'
import { useLanguage } from '../../../app/[lang]/languageContext';
import { ProfileCard } from '@/components/ui/main/ProfileCard'
import { useFlats } from './flats/hooks/useFlats'
import { FlatsFeed } from '@/components/ui/flat/FlatsFeed'

export default function MySpacePage() {
	const { dictionary }: { dictionary: Record<string, any> } = useLanguage();
		const { flats } = useFlats();

	return (
		<>
			<div className='grid min-h-screen max-w-[1000px] mx-[30px]  lg:mx-auto lg:px-[30px]'>
				<div className={`text-[22px] lg:text-[26px] mt-5 text-black`}>
					{dictionary.myspace.myspace}
				</div>

				<ProfileCard />
				<FlatsFeed flats={flats} />

			</div>
		</>
	)
}
