// rentrocket-frontend/src/hooks/chat/useSendMessage.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useLanguage } from '../../app/[lang]/languageContext'
import { IChatMessageCreateRequest } from '@/types/chat.types'
import { chatService } from '@/services/chat.service'

export function useSendMessage(flatId: string) {
  const { dictionary } = useLanguage()
  const queryClient = useQueryClient()

  const { mutate: sendMessage, isPending } = useMutation({
    mutationKey: ['send-message', flatId],
    mutationFn: (data: IChatMessageCreateRequest) => chatService.createMessage(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['chat', flatId] })
    },
    onError() {
      toast.error('Failed to send message')
    }
  })

  return { sendMessage, isPending }
}