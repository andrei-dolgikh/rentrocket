import Image from 'next/image'
import Link from 'next/link'
import { Chip } from "@nextui-org/chip";
import { CheckCircle } from 'lucide-react';
import { getColor } from '@/components/ui/tag/TagChip'
import { useLanguage } from '../../../app/[lang]/languageContext';
import { createLocalizedUrl } from '../../../utils/utils'
import { IFlatResponse } from '../../../types/flat.types'
import useImage from '@/hooks/useImage';
import DOMPurify from 'dompurify';
import { Checkbox } from '@nextui-org/react'

enum CardType {
    Admin = 'admin',
    Client = 'client',
}

export function FlatsFeedElement({ 
    flat, 
    showCheckbox,
    onCheckboxChange
}: { 
    flat: IFlatResponse, 
    showCheckbox?: boolean,
    onCheckboxChange?: (id: string, checked: boolean) => void
}) {
	const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
   
    const flatLinkClient = `${lang}/flat/${flat.id}`
    const flatLinkAdmin =  createLocalizedUrl(lang, `/myspace/flats/${flat.id}`)
    const flatDescriptionCut = flat.description?.length ? flat.description?.length > 250 ? flat.description?.slice(0, 247) + '...' : flat.description : ''


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onCheckboxChange) {
          onCheckboxChange(flat.id, event.target.checked);
        }
      }

    return (
        <div className={`flex flex-row justify-start items-center w-full border-1 border-gray`}>
            <div className='w-[111px] lg:w-[265px] h-[111px] lg:h-[265px] m-0'>
                <Link href={flatLinkClient} className='cursor-pointer'>
                    {flat.iconUrl &&
                        <Image
                            src={useImage(flat.iconUrl)}
                            alt={flat.name || 'flat image'}
                            width={265}
                            height={265}
                            priority

                            className='flatsfeedimage'
                        />
                    }
                </Link>
            </div>
            <div className={`
                px-[13px] 
                py-[13px] 
                lg:py-[13px] 
                lg:px-[40px] 
                flex
                flex-col
                justify-center
                gap-[10px]
                w-full `
            }>
                <div className='text-black  flex flex-row justify-between'>
                    <div>
                        <Link href={flatLinkAdmin} className='cursor-pointer'>
                            <div className='text-[16px] lg:text-[32px]'>{flat.name}</div>
                        </Link>
                    </div>
                    {/* <div className='flex flex-row'>
                        <div className='m-auto'>

                            {flat.recommended &&
                                <>
                                    <Chip size="md" radius="full" color="success" className='lg-max:hidden text-black p-1 text-[12px]'>
                                        <span >Рекомендуем </span>
                                    </Chip>
                                    <span className='lg:hidden'><CheckCircle size={16} color="green" /></span>
                                </>
                            }
                        </div>
                    </div> */}
                </div>
                <div className='flex flex-row flex-wrap items-center gap-2'>
                    {flat?.tags?.map((tag) => (
                        <Chip key={tag.id} radius="full" color={getColor(tag.name)} size="md" className='text-[12px] lg:text-[16px] '>
                            {tag.name}
                        </Chip>
                    ))}
                </div>
                <div
                    className='text-[14px] lg:text-[16px] text-[#999999] py-[3px] lg:py-[13px]'
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(flatDescriptionCut) }}></div>
                <div className='text-[10px] lg:text-[14px] text-[#999999] flex flex-row justify-between'>
                    {/* <AvailLabel availability={flat.isAvailable ? 'online' : 'offline'} /> */}
                    <Link href={flatLinkAdmin} className='cursor-pointer'>
                        <div className='lg-max:hidden flex flex-row  text-black text-[10px] lg:text-[15px]'>
                        {dictionary.main.edit}
                        </div>
                    </Link>
                </div>
            </div>
            {showCheckbox && <Checkbox className='m-3' onChange={handleCheckboxChange} />}
        </div>
    )
}

