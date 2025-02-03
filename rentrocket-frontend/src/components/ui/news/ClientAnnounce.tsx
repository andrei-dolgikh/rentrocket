import Image from 'next/image'
import Link from 'next/link'
import {Chip} from "@nextui-org/chip";
import { CheckCircle } from 'lucide-react';
import { AvailLabel } from '../availability/AvailLabel'
import { IResourceResponse } from '../../../types/flat.types'
import  useImage  from '@/hooks/useImage';
import DOMPurify from 'dompurify';
import { Eye, MessageCircle } from 'lucide-react';

function sanitize(text: string): string {
    const textWithoutBrTags = text.replace(/<br\s*\/?>/gi, ' ');
    return DOMPurify.sanitize(textWithoutBrTags, );
}


export function ClientAnnounce({ resource }: { resource: IResourceResponse }) {
        const resourceLinkClient = `/resource/${resource.id}`
        const resourceDescriptionCut = resource.description?.length
        ? (resource.description.length > 250 
            ? resource.description.slice(0, 247) + '...' 
            : sanitize(resource.description)) 
        : '';
        // const resourceDescriptionCut = resource.description?.length? resource.description?.length > 250 ? resource.description?.slice(0, 247) + '...' : resource.description : ''
        const formattedCreatedAt = resource?.createdAt ? new Date(resource.createdAt).toLocaleDateString() : '';


    return (
        <div className={`flex flex-row justify-start items-center w-full bg-[#1E1E1E] 
                ${resource.recommended ? 'border-1 border-[#30D158]' : ''}
            `}>
            <div className='w-[111px] lg:w-[265px] h-[111px] lg:h-[265px] m-0'>
                    <Link href={resourceLinkClient} className='cursor-pointer'>
                      {resource.iconUrl && 
                        <Image
                            src={useImage(resource.iconUrl)}
                            alt={resource.name || 'resource image'}
                            width={265}
                            height={265}
                            priority

                            className='resourcesfeedimage'
                        />
                      }
                    </Link>
            </div>
            <div className={`
                px-[13px] 
                lg:px-[40px] 
                flex
                flex-col
                justify-center
                gap-[5px]
                w-full `
            }>
                <div className='text-white  flex flex-row justify-between'>
                        <div>
                            <Link href={resourceLinkClient} className='cursor-pointer'>
                                <div className='text-[16px] lg:text-[32px]'>{resource.name}</div>
                            </Link>
                        </div>
                </div>

                <div 
                    className='text-[14px] lg:text-[16px] text-[#999999] py-[3px] '
                    dangerouslySetInnerHTML={{ __html: sanitize(resourceDescriptionCut) }}></div>


                <div className='flex flex-row gap-5 text-[#999999]'>

                        <div>{formattedCreatedAt || 'Без даты выпуска'}</div>
						{resource.viewsCount !== undefined && (
							<div className='flex flex-row items-center gap-1'>
								<Eye size={16} />
								<span>{resource.viewsCount}</span>
							</div>
						)}
						{resource.commentsCount !== undefined && (
							<div className='flex flex-row items-center gap-1'>
								<MessageCircle size={16} />
								<span>{resource.commentsCount}</span>
							</div>
						)}

                </div>
            </div>
        </div>
    )
}