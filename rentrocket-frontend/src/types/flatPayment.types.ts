
export interface IFlatPayment {
	id: string
	name: string
	description?: string
	files?: string[]
	amount: number
	period: Date
}

export interface IFlatPaymentDeleteRequest {
	id: string
}

export interface IReadingDeleteRequest {
	id: string
}



export type TypeFlatPaymentFormState = Partial<Omit<IFlatPayment, 'updatedAt'>>