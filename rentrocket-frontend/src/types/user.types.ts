import type { IBase } from './root.types'

export interface IUser {
	id: string
	login: string
	email: string
	primaryPhone: string
	roles: Roles[]
	name: string
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }


export enum Roles {
	admin = 'admin',
	user = 'user'
}

export enum FlatUserRoles {
	owner = 'OWNER',
	renter = 'RENTER',
	manager = 'MANAGER'
}


export const roleTranslations = {
	[Roles.admin]: 'Администратор',
	[Roles.user]: 'Пользователь',
  };

export interface IUserResponse extends IBase {
	id: string
	login: string
    roles: Roles[]
	name: string
	email: string
	primaryPhone: string
    createdAt: string
}

export interface IUserUpdateRequest {
	name: string
	email: string
	primaryPhone: string
}