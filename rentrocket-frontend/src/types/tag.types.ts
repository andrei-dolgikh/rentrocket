import type { IBase } from './root.types'

// export enum EnumResourcePriority {
// 	low = 'low',
// 	medium = 'medium',
// 	high = 'high'
// }

export interface ITag extends IBase {
	id: string
	name: string
	order: number
}

export interface ITagResponse extends IBase {
	id: string
	name: string
	order: number
}

export interface ITagCreateRequest extends IBase {
	name: string
	order: number
}

export type TypeTagForm = Partial<Omit<ITagResponse, 'id' | 'updatedAt'>>
