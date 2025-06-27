'use client'
import Link from 'next/link'
import { useLanguage } from '../../app/[lang]/languageContext';
import { createLocalizedUrl } from '../../utils/utils'
import { IFlatResponse } from '../../types/flat.types'
import useImage from '@/hooks/useImage';
import { Checkbox } from "@heroui/react"
import { Image, Button } from "@heroui/react";
import { Card } from '@heroui/react';

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
        <Card className="relative w-full overflow-hidden bg-white dark:bg-gray-900 border-l-4 border-primary">
            {/* Status indicator */}
            <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium z-10">
                Available
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                {/* Left side with image */}
                <div className="md:col-span-4 lg:col-span-3 relative">
                    <Link href={flatLinkClient} className="block">
                        <div className="relative h-56 md:h-full w-full">
                            {flat.iconUrl ? (
                                <Image
                                    alt={flat.name || 'flat image'}
                                    src={useImage(flat.iconUrl)}
                                    className=" opacity-100"
                                    width={300}
                                    height={300}
                                />
                            ) : (
                                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </Link>
                </div>
                
                {/* Right side with content */}
                <div className="md:col-span-8 lg:col-span-9 p-5 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                        <Link href={flatLinkAdmin} className="group">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors">
                                {flat.name}
                            </h3>
                        </Link>
                    </div>
                    
                    {flat.address && (
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 mb-3 w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {flat.address}
                        </div>
                    )}
                    
                    <div className="flex-grow">
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-sm">
                            {flatDescriptionCut}
                        </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-2">
                            <Button 
                                as={Link} 
                                href={flatLinkAdmin} 
                                color="primary" 
                                variant="flat"
                                size="sm"
                                className="font-medium"
                            >
                                {dictionary.main.edit}
                            </Button>
                            
                            <Button
                                as={Link}
                                href={flatLinkClient}
                                color="default"
                                variant="light"
                                size="sm"
                            >
                                View Details
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
                </div>
            </div>
        </Card>
    )
}