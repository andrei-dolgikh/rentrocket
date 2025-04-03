'use client'
import { FlatImageUploader } from '@/components/ui/flat/FlatImageUploader'
import { FlatMultiImageUploader } from '@/components/ui/flat/FlatMultiImageUploader'

export function FlatSettingsPhotosTab(
    { formData, handleFormChange}:
        { formData: any, handleFormChange: any}
) {
    return (
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
    )
}