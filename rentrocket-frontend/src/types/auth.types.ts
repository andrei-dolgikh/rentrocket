import { IFlatInvitation } from "./flat.types"

export interface IRegForm {
	login: string
	password: string
	captcha: string
	name: string
	email: string
}

export interface IAuthForm {
	login: string
	password: string
	captcha: string
}

export interface IUser {
	id: string
	login: string
	roles: Roles[]
	name: string
	email: string
	primaryPhone: string
	invitations: IFlatInvitation[]
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }


export enum Roles {
	admin = 'admin',
	user = 'user'
}