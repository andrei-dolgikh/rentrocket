import { Card, CardBody } from "@heroui/react";
import { Button, Spinner } from "@heroui/react";
import { PlusCircle } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { FileService } from '../../../services/files.service';
import useImage from '@/hooks/useImage';



const fileService = new FileService();


export function FlatImageUploader({ image, setImage }: { image?: string, setImage: (image: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedImage, setUploadedImage] = useState(image); 


  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      setFileName(file.name);
      setUploadStatus('');


      const formData = new FormData();
      formData.append('image', file, file.name);
      try {
        const response = await fileService.uploadFlatAvatar(formData);
        setImage(response.data.url);  
        setUploadedImage(response.data.url); 
        setUploadStatus('Загружено');
      } catch (error) {
        console.error('Ошибка загрузки файла:', error);
        setUploadStatus('Ошибка загрузки');
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    setUploadedImage(image);
  }, [image]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  return (
    <div className='flex flex-col'>
      <div><h3 className="text-default-500 text-small pb-3">Фотографии</h3></div>
      <div className="flex flex-row justify-evenly min-h-[123px]">
        <Card className="w-[90%] xl:w-[395px] justify-center">
          <CardBody>
            <div
              className="m-auto rounded-lg flex justify-center items-center"
            >
              <input
                type="file"
                accept="image/*"
                name='avatar'
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                color="primary"
                onPress={handleButtonClick}
                disabled={isLoading}
              >
                <PlusCircle />
              </Button>
            </div>
            {isLoading && (
              <div className="flex justify-center mt-2">
                <Spinner />
              </div>
            )}
            {fileName && (
              <div className="mt-2 text-center">
                <p>{fileName}</p>
                <p>{uploadStatus}</p>
              </div>
            )}
          </CardBody>
        </Card>
        <Card className="w-[90%] xl:w-[123px] ml-5">
          <CardBody>
            <div className=" overflow-hidden">
              {uploadedImage && ( 
                <img
                  src={useImage(uploadedImage)}
                  alt="Uploaded image"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}