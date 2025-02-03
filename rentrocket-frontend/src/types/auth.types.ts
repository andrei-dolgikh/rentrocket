export interface IAuthForm {
	login: string
	password: string
	captcha: string
	name?: string
}

export interface IUser {
	id: number
	login: string
	roles: Roles[]
	name: string
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