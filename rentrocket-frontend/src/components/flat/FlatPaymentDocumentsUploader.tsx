import { Card, CardBody } from "@heroui/react";
import { Button, Spinner } from "@heroui/react";
import { PlusCircle, X } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { FileService } from '../../services/files.service';

const fileService = new FileService();

export function FlatPaymentDocumentsUploader({ files = [], setFiles }: { 
  files?: string[], 
  setFiles: (files: string[]) => void 
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(files || []);

  useEffect(() => {
    setUploadedFiles(files || []);
  }, [files]);

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      setUploadStatus('');

      const formData = new FormData();
      formData.append('files', file, file.name);
      
      try {
        const response = await fileService.uploadFlatPaymentDocuments(formData);
        // Assuming the response now returns an array of file objects with urls
        const newFileUrl = response.data.files[0].url;
        
        // Add the new file to the array
        const newFiles = [...uploadedFiles, newFileUrl];
        setUploadedFiles(newFiles);
        setFiles(newFiles);
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
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    setFiles(newFiles);
  };

  return (
    <div className='flex flex-col'>
      <div><h3 className="text-default-500 text-small pb-3">Документы</h3></div>
      <Card className="w-full">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <span>Загрузите документы для квартиры</span>
            <Button
              color="primary"
              onPress={handleButtonClick}
              disabled={isLoading}
              size="sm"
            >
              <PlusCircle className="mr-1" size={16} />
              Добавить файл
            </Button>
          </div>
          
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          
          {isLoading && (
            <div className="flex justify-center my-4">
              <Spinner />
            </div>
          )}
          
          {uploadStatus && (
            <div className="text-center my-2">
              <p>{uploadStatus}</p>
            </div>
          )}
          
          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Загруженные файлы:</h4>
              <ul className="space-y-2">
                {uploadedFiles.map((fileUrl, index) => {
                  // Extract filename from URL
                  const fileName = fileUrl.split('/').pop() || `Файл ${index + 1}`;
                  // Determine if it's a PDF
                  const isPdf = fileName.toLowerCase().endsWith('.pdf');
                  
                  return (
                    <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                      <div className="flex items-center">
                        {/* Simple icon to indicate file type */}
                        <span className="mr-2">
                          {isPdf ? '📄' : '🖼️'}
                        </span>
                        <span className="truncate max-w-xs">{fileName}</span>
                      </div>
                      <Button 
                        color="danger" 
                        variant="light" 
                        size="sm"
                        isIconOnly
                        onPress={() => handleRemoveFile(index)}
                      >
                        <X size={16} />
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}