'use client'
import { useLanguage } from '../../../app/[lang]/languageContext';

export default function HelpPage() {
	const { dictionary }: { dictionary: Record<string, any> } = useLanguage();
	return (
		<>
			<div className='grid min-h-screen max-w-[1000px]'>
				<div className={`text-[22px] lg:text-[26px] my-5 text-black`}>
					{dictionary.help.subtitle}
				</div>


			</div>
		</>
	)
}
