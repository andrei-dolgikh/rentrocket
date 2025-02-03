import { ITagResponse, TypeTagForm } from '@/types/tag.types'
import { axiosWithAuth } from '@/api/interceptors'

class TagService {
	private USER_URL = '/tags'
	private UPDATE_URL = '/tags/update'
	private LIST_URL = '/tags/list'
	private CREATE_URL = '/tags/create'
	private DELETE_URL = '/tags/delete'

	async getTag(id: string) {
		const response = await axiosWithAuth.get<ITagResponse>(`${this.USER_URL}/${id}`)
		return response.data
	}

	async updateTag(id: string, data: TypeTagForm) {
		const response = await axiosWithAuth.put(`${this.UPDATE_URL}/${id}`, data)
		return response.data
	}

	async getAll() {
		const response = await axiosWithAuth.get<ITagResponse[]>(this.LIST_URL)
		return response.data
	}

	async createTag(data: TypeTagForm) {
		const response = await axiosWithAuth.post(this.CREATE_URL, data)
		return response.data
	}

	async deleteTag(id: string) {
		const response = await axiosWithAuth.delete<Boolean>(`${this.DELETE_URL}/${id}`)
		return response.data
	}
}

export const tagService = new TagService()
