import type { ICounter } from '@/types/counter.types'
import { axiosWithAuth } from '@/api/interceptors'

class CounterService {
	private BASE_URL = '/counters'

	async getById(id: string) {
		const response = await axiosWithAuth.get<ICounter>(`${this.BASE_URL}/${id}`)
		return response
	}

	async getCounters(flatId: string) {
		const response = await axiosWithAuth.get<ICounter[]>(`${this.BASE_URL}/list/${flatId}`)
		return response
	}

	async createCounter(id: string, data: ICounter) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/create/${id}`, data)
		return response
	}

	async updateCounter(id: string, data: ICounter) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/update/${id}`, data)
		return response
	}

	async deleteCounter(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/delete/${id}`)
		return response
	}
}

export const counterService = new CounterService()