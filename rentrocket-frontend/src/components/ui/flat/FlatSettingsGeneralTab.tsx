'use client'
import { Input, Textarea } from "@heroui/input";
import { TagPanel } from '@/components/ui/tag/TagPanel'
import { ITag } from '@/types/tag.types'
import { FlatImageUploader } from '@/components/ui/flat/FlatImageUploader'


export function FlatSettingsGeneralTab(
    { formData, handleFormChange, flat, tags, tabMode }:
        { formData: any, handleFormChange: any, flat?: any, tags: ITag[], tabMode: string }
) {

    return (
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
                    selectedTags={tabMode === 'create' ? formData?.tags : flat?.tags}
                    onTagsChange={(selectedTags) => handleFormChange({ ...formData, tags: selectedTags })}
                    tagsList={tags} />
            </div>


            <Textarea
                label="Описание:"
                value={formData.description}
                onChange={(e) => handleFormChange({ ...formData, description: e.target.value })}
                className="w-[90%] xl:w-[769px] my-5"
                name='description' />

            <div className='flex flex-row justify-start gap-4'>

                <Input
                    id='address'
                    className='w-[30%] xl:w-[380px]'
                    label="Адрес"
                    value={formData.address}
                    onChange={(e) => handleFormChange({ ...formData, address: e.target.value })}
                    name='address' />

                <Input
                    id='entergroup'
                    className='w-[20%] xl:w-[200px]'
                    label="Подъезд и этаж"
                    value={formData.entergroup}
                    onChange={(e) => handleFormChange({ ...formData, name: e.target.value })}
                    name='entergroup' />

                <Input
                    id='chambres'
                    className='w-[20%] xl:w-[200px]'
                    label="Количество комнат"
                    value={formData.chambres}
                    type="number"
                    min="1"
                    onChange={(e) => handleFormChange({ ...formData, chambres: +e.target.value })}
                    name='chambres' />

                <Input
                    id='size'
                    className='w-[20%] xl:w-[200px]'
                    label="Площадь"
                    value={formData.size}
                    onChange={(e) => handleFormChange({ ...formData, size: +e.target.value })}
                    type="number"
                    min="1"
                    step="0.1"
                    name='size' />


            </div>
            <div className='flex flex-col xl:flex-row justify-evenly xl:justify-start my-5 '>
                <FlatImageUploader
                    image={formData.iconUrl}
                    setImage={(image) => handleFormChange({ ...formData, iconUrl: image })} />

            </div>
        </div>

    )
}