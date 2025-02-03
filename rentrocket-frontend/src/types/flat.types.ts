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
	status: string
	viewsCount?: number
	commentsCount?: number
	usersCount?: number
	recommended: boolean
	rating?: number
	iconUrl?: string
	order: number
	price?: number
	tags: ITag[]
	createdAt: string
	updatedAt: string
	isAvailable: boolean
}

export interface IFlatCreateRequest {
	name: string
	description?: string
	recommended?: boolean
	iconUrl?: string
	order?: number
	price?: number
	tags: ITag[]
}

export interface IFlatUpdateRequest {
	name: string
	description?: string
	recommended?: boolean
	iconUrl?: string
	order?: number
	price?: number
	tags: ITag[]
}

export interface IFlatDeleteRequest extends IBase {
	id: string
}



export type TypeFlatFormState = Partial<Omit<IFlatResponse, 'updatedAt'>>