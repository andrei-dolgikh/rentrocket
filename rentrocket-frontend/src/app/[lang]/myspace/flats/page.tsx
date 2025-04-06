'use client'
import { FlatsFeed } from '@/components/ui/flat/FlatsFeed'
import { Link } from "@heroui/react"
import { useFlats } from './hooks/useFlats'
import { useLanguage } from '../../../../app/[lang]/languageContext';
import { createLocalizedUrl } from '../../../../utils/utils'
import { Button } from "@heroui/button";

export default function FlatPage() {
	const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
	const { flats } = useFlats();
	return (
		<div>
			<Button as={Link} color="primary" href={createLocalizedUrl(lang, `/myspace/flats/new`)} variant="solid" className='my-5'>
				{dictionary.hooks.useFlatCreateStart}
			</Button>
			<FlatsFeed flats={flats} />
		</div>
	)
}
