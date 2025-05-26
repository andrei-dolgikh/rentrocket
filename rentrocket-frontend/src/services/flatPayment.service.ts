import type { IFlatPayment } from '@/types/flatPayment.types'
import { axiosWithAuth } from '@/api/interceptors'

class FlatPaymentService {
	private BASE_URL = '/flatPayments'

	async getById(id: string) {
		const response = await axiosWithAuth.get<IFlatPayment>(`${this.BASE_URL}/${id}`)
		return response
	}

	async getFlatPayments(flatId: string) {
		const response = await axiosWithAuth.get<IFlatPayment[]>(`${this.BASE_URL}/list/${flatId}`)
		return response
	}

	async createFlatPayment(id: string, data: IFlatPayment) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/create/${id}`, data)
		return response
	}

	async updateFlatPayment(id: string, data: IFlatPayment) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/update/${id}`, data)
		return response
	}

	async deleteFlatPayment(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/delete/${id}`)
		return response
	}
}

export const flatPaymentService = new FlatPaymentService()