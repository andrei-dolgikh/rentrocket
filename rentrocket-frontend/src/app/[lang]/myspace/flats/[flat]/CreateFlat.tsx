'use client'
import { Button } from "@heroui/button";
import { IFlatCreateRequest } from '@/types/flat.types'
import { useCreateFlat } from '../../../myspace/flats/hooks/useCreateFlat'
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs'
import { useState, FormEvent } from 'react'
import { FlatSettingsGeneralTab } from "@/components/flat/tabs/FlatSettingsGeneralTab";


export function CreateFlat() {
    const [formDisabled, setFormDisabled] = useState(true);
    const { createFlat, isPending } = useCreateFlat()
    const crumbs = [
        { active: true, name: 'Новая квартира', url: '' }
    ]

    const [formData, setFormData] = useState({
        name: "",
        order: 999,
        description: "",
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
            <form
                className=''
                onSubmit={onCreateSubmit}
            >
                <div className='flex justify-between my-[30px]'>
                    <Breadcrumbs crumbs={crumbs} />
                    <Button
                        type='submit'
                        className='text-[12px]'
                        isDisabled={formDisabled}
                        color="primary"
                    >Создать квартиру</Button>
                </div>
                <FlatSettingsGeneralTab formData={formData} handleFormChange={handleFormChange} />
            </form>
    )
}