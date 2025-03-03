import Image from 'next/image'
import { useLanguage } from '../../../app/[lang]/languageContext';

export function MainBanner() {

    const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
    return (
        <div className='flex flex-col justify-between w-full text-black text-[32px] lg:text-[46px] mt-5 mb-[50px]'>
            <div className="">RENT PULT BANNER</div>
            <div className="font-bold text-lg">{dictionary.main.mainText1}</div>
            <div className="text-base">{dictionary.main.mainText2}</div>
            <div className="text-base">{dictionary.main.mainText3}</div>
            <div className="text-base">{dictionary.main.mainText4}</div>
        </div>
    )
}