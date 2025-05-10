import type { IBase } from './root.types'

export interface ICounter extends IBase {
	name: string
}

export interface ICounterDeleteRequest extends IBase {
	id: string
}


export type TypeCounterFormState = Partial<Omit<ICounter, 'updatedAt'>>