import type { IFlatResponse, IFlatUpdateRequest, IFlatCreateRequest, IFlatUsersUpdateRequest } from '@/types/flat.types'
import { axiosWithAuth } from '@/api/interceptors'

class FlatService {
	private BASE_URL = '/flats'

	async getById(id: string) {
		const response = await axiosWithAuth.get<IFlatResponse>(`${this.BASE_URL}/${id}`)
		return response
	}

	async getFlats() {
		const response = await axiosWithAuth.get<IFlatResponse[]>(`${this.BASE_URL}/catalog`)
		return response
	}

	async createFlat(data: IFlatCreateRequest) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/create`, data)
		return response
	}

	async updateFlat(id: string, data: IFlatUpdateRequest) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/update/${id}`, data)
		return response
	}

	async deleteFlat(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/delete/${id}`)
		return response
	}

	async getStatistics() {
		const response = await axiosWithAuth.get<any>(`${this.BASE_URL}/statistics`)
		return response
	}

	async addRenter(flatId: string, data: IFlatUsersUpdateRequest) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/add-renters/${flatId}`,  data)
		return response
	}

	async removeRenter(flatId: string, data: IFlatUsersUpdateRequest) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/remove-renters/${flatId}`,  data)
		return response
	}

	async addManager(flatId: string, data: IFlatUsersUpdateRequest) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/add-managers/${flatId}`,  data)
		return response
	}

	async removeManager(flatId: string, data: IFlatUsersUpdateRequest) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/remove-managers/${flatId}`,  data)
		return response
	}

	async addOwner(flatId: string, data: IFlatUsersUpdateRequest) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/add-owners/${flatId}`,  data)
		return response
	}

	async removeOwner(flatId: string, data: IFlatUsersUpdateRequest) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/remove-owners/${flatId}`,  data)
		return response
	}
}

export const flatService = new FlatService()