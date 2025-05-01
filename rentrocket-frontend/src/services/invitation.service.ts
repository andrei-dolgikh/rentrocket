import type { IFlatUsersUpdateRequest, IFlatUsersRemoveRequest } from '@/types/flat.types'
import { axiosWithAuth } from '@/api/interceptors'

class InvitationService {
	private BASE_URL = '/invitations'

	async addUser(flatId: string, data: IFlatUsersUpdateRequest) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/add-user/${flatId}`,  data)
		return response
	}

	async removeUser(flatId: string, data: IFlatUsersRemoveRequest) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/remove-user/${flatId}`,  data)
		return response
	}

	async acceptInvitation(invitationId: string) {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/accept/${invitationId}`)
		return response
	}

	async rejectInvitation(invitationId: string) {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/reject/${invitationId}`)
		return response
	}
}

export const invitationService = new InvitationService()