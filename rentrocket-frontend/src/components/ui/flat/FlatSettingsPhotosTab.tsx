'use client'
import { ITag } from '@/types/tag.types'
import { FlatImageUploader } from '@/components/ui/flat/FlatImageUploader'

export function FlatSettingsPhotosTab(
    { formData, handleFormChange}:
        { formData: any, handleFormChange: any}
) {

    return (
        <div className='flex flex-col'>

            <div className='flex flex-col xl:flex-row justify-evenly xl:justify-start my-5 '>
                <FlatImageUploader
                    image={formData.iconUrl}
                    setImage={(image) => handleFormChange({ ...formData, iconUrl: image })} />
            </div>
        </div>
    )
}