'use client'
import { Button } from "@heroui/button";
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs'
import { FlatSettingsNewFlatTab } from "@/components/flat/tabs/FlatSettingsNewFlatTab";


export function CreateFlat() {
    const crumbs = [
        { active: true, name: 'Новая квартира', url: '' }
    ]


    return (
            <>
                <div className='flex justify-between my-[30px]'>
                    <Breadcrumbs crumbs={crumbs} />
                </div>
                <FlatSettingsNewFlatTab />
            </>
    )
}