// rentrocket-frontend/src/components/shared/FileUploader.tsx (continued)
'use client'
import { useState } from 'react'
import { Button } from "@heroui/button"
import { Upload, X } from "lucide-react"
import { toast } from 'sonner'
import { axiosWithAuth } from '@/api/interceptors'

export function FileUploader({ onUpload }: { onUpload: (files: string[]) => void }) {
  const [isUploading, setIsUploading] = useState(false)
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    setIsUploading(true)
    
    try {
      const uploadedUrls: string[] = []
      
      // Create a FormData object to send files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('file', file)
        
        // Upload each file
        const response = await axiosWithAuth.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        // Add the URL from the response to our array
        if (response.data && response.data.url) {
          uploadedUrls.push(response.data.url)
        }
      }
      
      // Call the callback with the array of uploaded file URLs
      onUpload(uploadedUrls)
      toast.success('Файлы успешно загружены')
    } catch (error) {
      console.error('Error uploading files:', error)
      toast.error('Не удалось загрузить файлы')
    } finally {
      setIsUploading(false)
      // Reset the input
      e.target.value = ''
    }
  }
  
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        multiple
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <label 
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center justify-center"
      >
        {isUploading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        ) : (
          <>
            <Upload className="h-8 w-8 text-gray-500 mb-2" />
            <p className="text-sm text-gray-500">
              Нажмите для выбора файлов или перетащите их сюда
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Максимальный размер файла: 5MB
            </p>
          </>
        )}
      </label>
    </div>
  )
}