'use client'
import { Input, Textarea } from "@heroui/input";
import { FlatImageUploader } from '@/components/flat/FlatImageUploader'
import { FlatMultiImageUploader } from '@/components/flat/FlatMultiImageUploader'
import { IFlatResponse, IFlatUpdateRequest } from '@/types/flat.types'
import { useState, FormEvent, useEffect } from 'react'
import { Button } from "@heroui/button";
import { useCreateFlat } from '@/hooks/flats/useCreateFlat'

export function FlatSettingsNewFlatTab(
) {

    const [formDisabled, setFormDisabled] = useState(true);
    const { createFlat, isPending } = useCreateFlat()

    const [formData, setFormData] = useState({
        name: "",
        order: 999,
        description: "",
        iconUrl: "",
        address: "",
        entergroup: "",
        chambres: undefined,
        size: undefined,
        images: undefined
    });

    const handleFormChange = (data: any) => {
        setFormData({ ...formData, ...data })
        setFormDisabled(false);
    };

    async function onCreateSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const userData: IFlatUpdateRequest = {
            name: formData.name as string,
            order: formData.order,
            description: formData.description as string,
            iconUrl: formData?.iconUrl,
            address: formData?.address,
            entergroup: formData?.entergroup,
            chambres: formData?.chambres,
            size: formData?.size,
            images: formData?.images,
        }

        createFlat( userData );
        setFormDisabled(true);
    };

    return (
        <form onSubmit={onCreateSubmit}>
            <div className='flex flex-col'>
                <Button type='submit' color="primary" className="w-[90%] my-5" isDisabled={formDisabled}>Сохранить квартиру</Button>
                <div className='flex flex-row justify-start gap-4'>
                    <Input
                        id='name'
                        className='w-[90%] xl:w-[389px]'
                        label="Название"
                        value={formData.name}
                        onChange={(e) => handleFormChange({ ...formData, name: e.target.value })}
                        name='name' />
                </div>


                <Textarea
                    label="Описание:"
                    value={formData.description}
                    onChange={(e) => handleFormChange({ ...formData, description: e.target.value })}
                    className="w-[90%] xl:w-max-[769px] my-5"
                    name='description' />

                <div className='flex flex-row justify-start gap-4'>

                    <Input
                        id='address'
                        className='w-[50%] xl:w-[380px]'
                        label="Адрес"
                        value={formData.address || ''}
                        onChange={(e) => handleFormChange({ ...formData, address: e.target.value })}
                        name='address' />

                    <Input
                        id='entergroup'
                        className='w-[50%] xl:w-[200px]'
                        label="Подъезд и этаж"
                        value={formData.entergroup || ''}
                        onChange={(e) => handleFormChange({ ...formData, entergroup: e.target.value })}
                        name='entergroup' />


                </div>
                <div className='flex flex-row justify-start gap-4 my-5 '>

                    <Input
                        id='chambres'
                        className='w-[50%] xl:w-[200px]'
                        label="Комнаты"
                        value={formData.chambres || ''}
                        type="number"
                        min="1"
                        onChange={(e) => handleFormChange({ ...formData, chambres: +e.target.value })}
                        name='chambres' />

                    <Input
                        id='size'
                        className='w-[50%] xl:w-[200px]'
                        label="Площадь"
                        value={formData.size || ''}
                        onChange={(e) => handleFormChange({ ...formData, size: +e.target.value })}
                        type="number"
                        min="1"
                        step="0.1"
                        name='size' />
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col xl:flex-row justify-evenly xl:justify-start my-5'>
                        <div className="w-full mb-8">
                            <h2 className="text-xl font-semibold mb-4">Основное фото (превью)</h2>
                            <FlatImageUploader
                                image={formData.iconUrl}
                                setImage={(image) => handleFormChange({ ...formData, iconUrl: image })} />
                        </div>
                    </div>

                    <div className='flex flex-col my-5'>
                        <h2 className="text-xl font-semibold mb-4">Галерея изображений</h2>
                        <FlatMultiImageUploader
                            images={formData.images || []}
                            setImages={(images) => handleFormChange({ ...formData, images })} />
                    </div>
                </div>
            </div>

        </form>

    )
}