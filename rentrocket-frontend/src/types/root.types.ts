export interface IBase {
	id: string
	createdAt?: string
	updatedAt?: string
}

export enum Status {
	active = 'ACTIVE',
	inactive = 'INACTIVE',
	deleted = 'DELETED',
	new = 'NEW'
}
