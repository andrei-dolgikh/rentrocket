import { AvailLabel } from '@/components/ui/availability/AvailLabel'
import DOMPurify from 'dompurify';
import { IFlatResponse } from '@/types/flat.types'
import { TagChip } from '@/components/ui/tag/TagChip'
import Image from 'next/image'
import useImage from '@/hooks/useImage';

export  function FlatHeader({ flat }: 
    { flat: IFlatResponse }) {
	return (
        <div className=" py-[10px] lg-max:text-center flex lg-max:items-center flex-col lg:flex-row gap-3">
            {flat.iconUrl &&
            <div className='w-[30%]'>
                <Image
                    src={useImage(flat.iconUrl)}
                    alt={flat.name || 'flat image'}
                    width={265}
                    height={265}
                    priority
                    className='resourcesheaderimage'
                />
                </div>
            }
            <div className='xl:mx-auto w-[70%] my-auto'>
                <AvailLabel availability={flat.isAvailable ? 'online' : 'offline'} />
                <div className='text-[24px] lg:text-[42px] text-white'>{flat.name}</div>
                <div
                //   className={`text-brandGrayLight text-[14px] lg:text-[18px] lg:w-2/3`}
                  className={`text-brandGrayLight text-[14px] lg:text-[18px] `}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(flat.description || '') }}
                />
                <div className='flex flex-row my-2 gap-2 justify-center lg:justify-start w-[100%] m-auto text-white'>
                    {flat?.tags?.map((tag) => (
                       <TagChip key={tag.id} name={tag.name} size={"md"} />
                    ))}
                </div>

            </div>
        </div>
	)
}



