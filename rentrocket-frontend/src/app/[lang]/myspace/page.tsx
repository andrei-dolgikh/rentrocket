'use client'
import { useLanguage } from '../../../app/[lang]/languageContext';
import { useFlats } from '@/hooks/flats/useFlats'
import { FlatsFeed } from '@/components/flat/FlatsFeed'

export default function MySpacePage() {
	const { dictionary }: { dictionary: Record<string, any> } = useLanguage();
		const { flats } = useFlats();

	return (
		<>
			<div className='min-h-screen '>
				<div className={`text-[22px] lg:text-[26px] my-5 text-black`}>
					{dictionary.myspace.myspace}
				</div>

				<FlatsFeed flats={flats} />

			</div>
		</>
	)
}
