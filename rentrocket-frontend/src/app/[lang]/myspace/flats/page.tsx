'use client'
import { FlatsFeed } from '@/components/ui/flat/FlatsFeed'
import { Link } from '@nextui-org/react'
import { useFlats } from './hooks/useFlats'
import { useLanguage } from '../../../../app/[lang]/languageContext';
import { createLocalizedUrl } from '../../../../utils/utils'

export default function FlatPage() {
	const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
	const { flats } = useFlats();
	return (
		<div>
			<Link href={createLocalizedUrl(lang, `/myspace/flats/new`)}>
				<div className={`text-[22px] lg:text-[26px] mt-5 text-black`}>
					{dictionary.hooks.useFlatCreateStart}
				</div>
			</Link>
			<FlatsFeed flats={flats} />
		</div>
	)
}
