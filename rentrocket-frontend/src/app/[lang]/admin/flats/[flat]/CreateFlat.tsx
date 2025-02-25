'use client'
import { Button } from "@nextui-org/button";
import { IFlatCreateRequest } from '@/types/flat.types'
import { useCreateFlat } from '@/app/admin/flats/hooks/useCreateFlat'
import { Input, Textarea } from "@nextui-org/input";
import { Breadcrumbs } from '@/components/ui/breadcrumbs/Breadcrumbs'
import { Checkbox, CheckboxGroup } from '@nextui-org/react'
import { Card, CardBody } from '@nextui-org/react'
import { useState, useCallback, useRef, FormEvent, ChangeEvent, useEffect } from 'react'
import { TagPanel } from '@/components/ui/tag/TagPanel'
import { useTags } from '@/app/admin/tags/hooks/useTags'
import { ITag } from '@/types/tag.types'
import { FlatImageUploader } from '@/components/ui/flat/FlatImageUploader'



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
        recommended: false,
        tags: [] as ITag[],
        iconUrl: "",
        price: 0
    });

    async function onCreateSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const userData: IFlatCreateRequest = {
            name: formData.name as string,
            order: formData.order,
            description: formData.description as string,
            recommended: formData.recommended as boolean,
            tags: formData?.tags as ITag[],
            price: formData.price,
            iconUrl: formData?.iconUrl
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
                {/* )} */}

                <div className='flex flex-col'>
                    <div className='flex flex-row justify-start gap-4'>
                        <Input
                            id='name'
                            className='w-[90%] xl:w-[389px]'
                            label="Название"
                            value={formData.name}
                            onChange={(e) => handleFormChange({ ...formData, name: e.target.value })}
                            name='name' />
                        <TagPanel
                            selectedTags={formData?.tags}
                            onTagsChange={(selectedTags) => handleFormChange({ ...formData, tags: selectedTags })}
                            tagsList={tags} />
                    </div>

                    <Textarea
                        label="Описание:"
                        value={formData.description}
                        onChange={(e) => handleFormChange({ ...formData, description: e.target.value })}
                        className="w-[90%] xl:w-[769px] my-5"
                        name='description'
                    />
                    <Input
                        id='name'
                        className='w-[90%] xl:w-[389px]'
                        label="Стоимость"
                        value={formData.price.toString()}
                        onChange={(e) => handleFormChange({ ...formData, price: +e.target.value })}
                        name='price' />

                    <CheckboxGroup
                        name='recommended'
                        orientation="horizontal"
                        className='ml-2 mt-2'
                        value={formData.recommended ? ["recommended"] : []}
                        onChange={(values) => handleFormChange({ ...formData, recommended: values.includes("recommended") })}
                    >
                        <Checkbox
                            key={"recommended"}
                            value="recommended"
                            color="success"
                        >
                            <span className="">Доступна для аренды</span>
                        </Checkbox>
                    </CheckboxGroup>

                    <div className='flex flex-col xl:flex-row justify-evenly xl:justify-start my-5 '>
                        <FlatImageUploader
                            image={formData?.iconUrl}
                            setImage={(image) => handleFormChange({ ...formData, iconUrl: image })}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}