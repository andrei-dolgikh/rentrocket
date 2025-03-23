'use client'
import { Button } from "@heroui/button";
import { IFlatCreateRequest } from '@/types/flat.types'
import { useCreateFlat } from '../../../admin/flats/hooks/useCreateFlat'
import { Breadcrumbs } from '@/components/ui/breadcrumbs/Breadcrumbs'
import { useState, FormEvent } from 'react'
import { useTags } from '../../../admin/tags/hooks/useTags'
import { ITag } from '@/types/tag.types'
import { FlatSettingsGeneralTab } from "@/components/ui/flat/FlatSettingsGeneralTab";
import { Tabs, Tab } from "@heroui/react";
import { FlatSettingsPhotosTab } from "@/components/ui/flat/FlatSettingsPhotosTab";


export function CreateFlat() {
    const [formDisabled, setFormDisabled] = useState(true);
    const { createFlat, isPending } = useCreateFlat()
    const { tags } = useTags()
    const crumbs = [
        { active: true, name: 'Новая квартира', url: '' }
    ]

    const [formData, setFormData] = useState({
        name: "",
        order: 999,
        description: "",
        tags: [] as ITag[],
        iconUrl: "",
		address: "",
		entergroup: "",
		chambres: undefined,
		size: undefined,
    });

    async function onCreateSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const userData: IFlatCreateRequest = {
            name: formData.name as string,
            order: formData.order,
            description: formData.description as string,
            tags: formData?.tags as ITag[],
            iconUrl: formData?.iconUrl,
            address: formData?.address,
            entergroup: formData?.entergroup,
            chambres: formData?.chambres,
            size: formData?.size
        }
        createFlat(userData);
    };

    const handleFormChange = (data: any) => {
        setFormData({ ...formData, ...data })
        setFormDisabled(false);
    };
    return (
        <div>
            <form
                className='mx-auto'
                onSubmit={onCreateSubmit}
            >

                {/* {isFlatEditor && ( */}
                <div className='flex justify-between my-[30px]'>
                    <Breadcrumbs crumbs={crumbs} />
                    <Button
                        type='submit'
                        className='text-[12px]'
                        isDisabled={formDisabled}
                        color="primary"
                    >Создать квартиру</Button>
                </div>
				<Tabs aria-label="Dynamic tabs" >
					<Tab key={0} title={"Основные настройки"}>
                <FlatSettingsGeneralTab formData={formData} handleFormChange={handleFormChange} tags={tags} tabMode={"create"} />
                </Tab>
                    <Tab key={2} title={"Фотографии"}>
                        <FlatSettingsPhotosTab formData={formData} handleFormChange={handleFormChange} />
                    </Tab>
				</Tabs>
            </form>
        </div>
    )
}