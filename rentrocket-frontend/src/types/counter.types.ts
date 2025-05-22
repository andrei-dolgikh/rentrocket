
export interface ICounter {
	id?: string
	name: string
	flatCounterReadings?: IReading[]
}

export interface ICounterDeleteRequest {
	id: string
}

export interface IReading {
	id?: string
	value: number
	date: Date
}

export interface IReadingDeleteRequest {
	id: string
}



export type TypeCounterFormState = Partial<Omit<ICounter, 'updatedAt'>>