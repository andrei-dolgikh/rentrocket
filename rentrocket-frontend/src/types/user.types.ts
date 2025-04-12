import type { IBase } from './root.types'

export interface IUser {
	id: number
	login: string
	roles: Roles[]
	name: string
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }


export enum Roles {
	admin = 'admin',
	user = 'user'
}

export enum FlatUserRoles {
	owner = 'owner',
	renter = 'renter',
	manager = 'manager'
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
    createdAt: string
}
