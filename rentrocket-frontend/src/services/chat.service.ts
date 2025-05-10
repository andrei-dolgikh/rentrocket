import { axiosWithAuth } from '@/api/interceptors'
import { IChatMessage, IChatMessageCreateRequest } from '@/types/chat.types'

class ChatService {
  private BASE_URL = '/chat'

  async getMessages(flatId: string) {
    const response = await axiosWithAuth.get<IChatMessage[]>(`${this.BASE_URL}/flat/${flatId}`)
    return response
  }

  async createMessage(data: IChatMessageCreateRequest) {
    const response = await axiosWithAuth.post<IChatMessage>(`${this.BASE_URL}/message`, data)
    return response
  }
}

export const chatService = new ChatService()