import type { IBase } from './root.types'
import type { IUser } from './user.types'

export enum FlatInvitationRole {
	OWNER = 'OWNER',
	MANAGER = 'MANAGER',
	RENTER = 'RENTER'
}
export enum FlatInvitationStatus {
	PENDING = 'PENDING',
	ACCEPTED = 'ACCEPTED',
	DECLINED = 'DECLINED'
}

export interface IFlatResponse extends IBase {
	name: string
	description?: string
	iconUrl?: string
	images?: string[]
	order: number
	address?: string
	entergroup?: string
	chambres?: number
	size?: number
	invitations: IFlatInvitation[]
	renters: IUser[]
	managers: IUser[]
	owners: IUser[]
	creator: IUser

}

export interface IFlatUsersUpdateRequest {
	email?: string
	role?: string
}

export interface IFlatUsersRemoveRequest {
	userId?: string
	role?: string
}

export interface IFlatCreateRequest {
	name: string
	description?: string
	iconUrl?: string
	images?: string[]
	order?: number
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
	address?: string
	entergroup?: string
	chambres?: number
	size?: number

}

export interface IFlatDeleteRequest extends IBase {
	id: string
}

export interface IFlatInvitation {
	id: string
	createdAt?: string
	email: string
	role: FlatInvitationRole
	status: FlatInvitationStatus
	user: IUser
	invitedBy: IUser
	flat: IFlatResponse
}



export type TypeFlatFormState = Partial<Omit<IFlatResponse, 'updatedAt'>>