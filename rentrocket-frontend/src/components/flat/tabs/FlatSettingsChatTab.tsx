'use client'
import { useState, useRef, useEffect } from 'react'
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Card, Avatar } from "@heroui/react"
import { PaperclipIcon, SendIcon } from "lucide-react"
import { useChat } from '@/hooks/chat/useChat'
import { useSendMessage } from '@/hooks/chat/useSendMessage'
import { useAuth } from '@/app/[lang]/authContext';
import { IChatMessageCreateRequest } from '@/types/chat.types'
import { FileUploader } from '@/components/shared/FileUploader'

export function FlatSettingsChatTab({ flat }: { flat?: any }) {
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState<string[]>([])
  const [showFileUploader, setShowFileUploader] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
const { profile } = useAuth();
  
  if (!flat) return <div>Квартира не найдена</div>
  
  const { messages, isLoading } = useChat(flat.id)
  const { sendMessage, isPending } = useSendMessage(flat.id)
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  const handleSendMessage = () => {
    if (!message.trim() && files.length === 0) return
    
    const messageData: IChatMessageCreateRequest = {
      message: message.trim(),
      flatId: flat.id,
      files: files
    }
    
    sendMessage(messageData)
    setMessage('')
    setFiles([])
    setShowFileUploader(false)
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  const handleFileUpload = (uploadedFiles: string[]) => {
    setFiles([...files, ...uploadedFiles])
  }
  
  return (
    <div className="flex flex-col h-[calc(100vh-320px)] min-h-[500px]">
      <Card className="flex-1 overflow-y-auto p-4 mb-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            Нет сообщений. Начните общение!
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.user.id === profile?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] ${
                    msg.user.id === profile?.id 
                      ? 'bg-primary-100 rounded-l-lg rounded-br-lg' 
                      : 'bg-gray-100 rounded-r-lg rounded-bl-lg'
                  } p-3`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar 
                      src={msg.user.avatarPath || ''} 
                      name={msg.user.name} 
                      size="sm" 
                    />
                    <span className="font-semibold text-sm">{msg.user.name}</span>
                    <span className="text-xs text-gray-500">
                      {msg.createdAt}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{msg.message}</p>
                  
                  {msg.files && msg.files.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.files.map((file, idx) => (
                        <a 
                          key={idx} 
                          href={file} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline flex items-center gap-1"
                        >
                          <PaperclipIcon size={16} />
                          Вложение {idx + 1}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </Card>
      
      {showFileUploader && (
        <div className="mb-4">
          <FileUploader onUpload={handleFileUpload} />
          
          {files.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center gap-1 bg-gray-100 p-1 rounded">
                  <PaperclipIcon size={16} />
                  <span className="text-sm">Файл {idx + 1}</span>
                  <button 
                    onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                    className="text-red-500 ml-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="flex gap-2">
        <Button
          type="button"
          variant="solid"
          size="md"
          onPress={() => setShowFileUploader(!showFileUploader)}
        >
          <PaperclipIcon size={20} />
        </Button>
        
        <Input
          className="flex-1"
          placeholder="Введите сообщение..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isPending}
        />
        
        <Button
          type="button"
          onClick={handleSendMessage}
          disabled={isPending || (!message.trim() && files.length === 0)}
        >
          <SendIcon size={20} />
        </Button>
      </div>
    </div>
  )
}