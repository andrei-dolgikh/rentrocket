// rentrocket-frontend/src/hooks/chat/useChat.ts
import { useQuery } from '@tanstack/react-query'
import { chatService } from '@/services/chat.service'

export function useChat(flatId: string) {
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['chat', flatId],
    queryFn: () => chatService.getMessages(flatId),
    refetchInterval: 5000, // Poll for new messages every 5 seconds
  })
  
  const messages = data?.data || []
  return { messages, isLoading, isSuccess, refetch }
}