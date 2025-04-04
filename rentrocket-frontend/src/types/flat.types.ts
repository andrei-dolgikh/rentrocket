import type { IBase } from './root.types'
import type { ITag } from './tag.types'
// export enum EnumFlatPriority {
// 	low = 'low',
// 	medium = 'medium',
// 	high = 'high'
// }

export interface IFlatResponse extends IBase {
	id: string
	name: string
	description?: string
	iconUrl?: string
	images?: string[]
	order: number
	tags: ITag[]
	address?: string
	entergroup?: string
	chambres?: number
	size?: number
	createdAt: string
	updatedAt: string
}

export interface IFlatCreateRequest {
	name: string
	description?: string
	iconUrl?: string
	images?: string[]
	order?: number
	tags: ITag[]
	address?: string
	entergroup?: string
	chambres?: number
	size?: number
}

export interface IFlatUpdateRequest {
	name: string
	description?: string
	iconUrl?: string
	images?: string[]
	order?: number
	tags: ITag[]
	address?: string
	entergroup?: string
	chambres?: number
	size?: number

}

export interface IFlatDeleteRequest extends IBase {
	id: string
}



export type TypeFlatFormState = Partial<Omit<IFlatResponse, 'updatedAt'>>