import { IUser, TypeUserForm } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'
import { IUserResponse, IUserUpdateRequest } from '@/types/user.types'

export interface IProfileResponse {
	user: IUser
	statistics: {
		label: string
		value: string
	}[]
}

class UserService {
	private PROFILE_URL = '/user/current'
	private USER_URL = '/user/detail'
	private UPDATE_URL = '/user/update'
	private LIST_URL = '/user/list'
	private CREATE_URL = '/user/create'
	private DELETE_URL = '/user/delete'

	async getProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(this.PROFILE_URL)
		return response.data
	}

	async getUser(id: string) {
		const response = await axiosWithAuth.get<IProfileResponse>(`${this.USER_URL}/${id}`)
		return response.data
	}

	async updateUser(id: string, data: IUserUpdateRequest) {
		const response = await axiosWithAuth.put(`${this.UPDATE_URL}/${id}`, data)
		return response.data
	}

	async getAll() {
		const response = await axiosWithAuth.get<IUserResponse[]>(this.LIST_URL)
		return response.data
	}

	async getAllByFlatId(id: string) {
		const response = await axiosWithAuth.get<IUserResponse[]>(`${this.LIST_URL}/${id}`)
		return response.data
	}

	async createUser(data: TypeUserForm) {
		const response = await axiosWithAuth.post(this.CREATE_URL, data)
		return response.data
	}

	async deleteUser(id: string) {
		const response = await axiosWithAuth.delete<Boolean>(`${this.DELETE_URL}/${id}`)
		return response.data
	}
}

export const userService = new UserService()
