'use client'
import { Input, Textarea } from "@nextui-org/input";
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

            <div className='flex flex-col xl:flex-row justify-evenly xl:justify-start my-5 '>
                <FlatImageUploader
                    image={formData.iconUrl}
                    setImage={(image) => handleFormChange({ ...formData, iconUrl: image })} />
            </div>
        </div>
    )
}