'use client'
import Link from 'next/link'
import { useLanguage } from '../../app/[lang]/languageContext';
import { createLocalizedUrl } from '../../utils/utils'
import { IFlatResponse } from '../../types/flat.types'
import useImage from '@/hooks/useImage';
import DOMPurify from 'dompurify';
import { Checkbox } from "@heroui/react"
import { Image, Button } from "@heroui/react";
import { Card, CardBody } from '@heroui/react';

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

    const flatLinkClient = createLocalizedUrl(lang, `/flat/${flat.id}`)
    const flatLinkAdmin = createLocalizedUrl(lang, `/myspace/flats/${flat.id}`)
    const flatDescriptionCut = flat.description?.length ? flat.description?.length > 250 ? flat.description?.slice(0, 247) + '...' : flat.description : ''


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onCheckboxChange) {
            onCheckboxChange(flat.id, event.target.checked);
        }
    }

    return (
        <Card className={`flex flex-row justify-start items-center w-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 `}>
            <div className="flex flex-col md:flex-row">
                <Link href={flatLinkClient} className='cursor-pointer'>
                    {flat.iconUrl &&

                        <Image
                            alt={flat.name || 'flat image'}
                            height={250}
                            src={useImage(flat.iconUrl)}
                            width={250}
                            className='opacity-1'
                        />
                    }
                </Link>

            </div>
                            
                            <CardBody className="flex flex-col justify-between md:w-2/3 lg:w-3/4 p-4 md:p-6">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <Link href={flatLinkAdmin} className="block">
                                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 hover:text-primary transition-colors">
                                                {flat.name}
                                            </h3>
                                        </Link>
                                    </div>
                                    
                                    {flat.address && (
                                        <div className="flex items-center text-gray-500 mb-3 text-sm">
                                            <i className="fas fa-map-marker-alt mr-2"></i>
                                            <span>{flat.address}</span>
                                        </div>
                                    )}
                                    
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {flatDescriptionCut}
                                    </p>
                                </div>
                                
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex gap-2">
                                        <Button 
                                            as={Link} 
                                            href={flatLinkAdmin} 
                                            color="primary" 
                                            variant="solid"
                                            size="md"
                                        >
                                            {dictionary.main.edit}
                                        </Button>
                                    </div>
                                    
                                    {showCheckbox && (
                                        <Checkbox 
                                            onChange={handleCheckboxChange} 
                                            size="lg"
                                            color="primary"
                                        />
                                    )}
                                </div>
                            </CardBody>
        </Card>
    )
}

