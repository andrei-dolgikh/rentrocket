import { Card, CardBody } from "@heroui/react";
import { Button, Spinner } from "@heroui/react";
import { PlusCircle, X } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { FileService } from '../../services/files.service';
import useImage from '@/hooks/useImage';

const fileService = new FileService();

export function FlatMultiImageUploader({ images = [], setImages }: {
    images?: string[],
    setImages: (images: string[]) => void
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');
    const [uploadedImages, setUploadedImages] = useState<string[]>(images || []);

    useEffect(() => {
        setUploadedImages(images || []);
    }, [images]);

    const handleFileChange = async (event: any) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        setUploadStatus('');

        const formData = new FormData();
        formData.append('image', file, file.name);

        try {
            const response = await fileService.uploadFlatImage(formData);
            const newImageUrl = response.data.url;

            // Add the new image to the array
            const newImages = [...uploadedImages, newImageUrl];
            setUploadedImages(newImages);
            setImages(newImages);
            setUploadStatus('Загружено');
        } catch (error) {
            console.error('Ошибка загрузки файла:', error);
            setUploadStatus('Ошибка загрузки');
        } finally {
            setIsLoading(false);
            // Clear the input value so the same file can be selected again
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...uploadedImages];
        newImages.splice(index, 1);
        setUploadedImages(newImages);
        setImages(newImages);
    };

    return (
        <div className='flex flex-col w-full'>
            <div><h3 className="text-default-500 text-small pb-3">Фотографии</h3></div>

            <div className="flex flex-col">
                <Card className="w-full mb-4">
                    <CardBody>
                        <div className="flex justify-center items-center">
                            <input
                                type="file"
                                accept="image/*"
                                name='image'
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <Button
                                color="primary"
                                onPress={handleButtonClick}
                                disabled={isLoading}
                            >
                                <PlusCircle className="mr-2" />
                                Добавить фотографию
                            </Button>
                        </div>
                        {isLoading && (
                            <div className="flex justify-center mt-2">
                                <Spinner />
                            </div>
                        )}
                        {uploadStatus && (
                            <div className="mt-2 text-center">
                                <p>{uploadStatus}</p>
                            </div>
                        )}
                    </CardBody>
                </Card>

                {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {uploadedImages.map((image, index) => (
                            <Card key={index} className="relative">
                                <Button
                                    isIconOnly
                                    color="danger"
                                    size="sm"
                                    className="absolute top-2 right-2 z-10"
                                    onClick={() => removeImage(index)}
                                >
                                    <X size={16} />
                                </Button>
                                <CardBody className="p-2">
                                    <div className="aspect-square overflow-hidden rounded-md">
                                        <img
                                            src={useImage(image)}
                                            alt={`Uploaded image ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}         