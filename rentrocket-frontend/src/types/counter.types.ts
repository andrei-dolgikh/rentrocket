import type { IBase } from './root.types'

export interface ICounter {
	id?: string
	name: string
}

export interface ICounterDeleteRequest extends IBase {
	id: string
}


export type TypeCounterFormState = Partial<Omit<ICounter, 'updatedAt'>>