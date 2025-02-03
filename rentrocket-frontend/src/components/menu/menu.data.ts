
import {
	KanbanSquare,
	LayoutDashboard,
	Home,
	Send,
	NotebookText,
	Info,
	MessageCircleMore,
} from 'lucide-react'
import { URLS_PAGES } from '@/config/pages-url.config'
import { Roles } from '@/types/auth.types';
import type { IMenuItem } from './menu.interface'

export const MENU: IMenuItem[] = [
	{
		id: 'client_home',
		icon: Home,
		link: URLS_PAGES.HOME,
		name: "О системе",
	},
	{
		id: 'admin_statistics',
		icon: KanbanSquare,
		link: URLS_PAGES.ADMIN_DASHBOARD,
		name: 'Дашборд',
		access: [Roles.admin]
	},
	// {
	// 	id: 'client_info',
	// 	icon: Info,
	// 	link: URLS_PAGES.INFO,
	// 	name: 'Информация',
	// },
	{
		id: 'admin_users',
		icon: KanbanSquare,
		link: URLS_PAGES.ADMIN_USERS,
		name: 'Пользователи',
		access: [Roles.admin]
	},
	{
		id: 'admin_flats',
		icon: Send,
		link: URLS_PAGES.ADMIN_FLATS,
		name: 'Управление квартирами',
		access: [Roles.admin]
	},
	{
		id: 'myspace_flats',
		icon: Send,
		link: URLS_PAGES.MYSPACE_FLATS,
		name: 'Управление квартирами',
		access: [Roles.user]
	},
	{
		id: 'admin_tags',
		icon: Send,
		link: URLS_PAGES.ADMIN_TAGS,
		name: 'Теги',
		access: [Roles.admin]
	},
	{
		id: 'myspace_tags',
		icon: Send,
		link: URLS_PAGES.MYSPACE_TAGS,
		name: 'Теги',
		access: [Roles.user]
	},
	// {
	// 	id: 'flats',
	// 	icon: Send,
	// 	link: URLS_PAGES.ADMIN_FLATS,
	// 	name: 'Квартиры'
	// },
	{
		id: 'tags',
		icon: Send,
		link: URLS_PAGES.ADMIN_TAGS,
		name: 'Карта ДУ',
	},
	{
		id: 'auth',
		icon: Send,
		link: URLS_PAGES.AUTH,
		name: 'Справочник',
	},
	
]

export const RIGHTMENU: IMenuItem[] = [
	{
		id: 'auth',
		icon: MessageCircleMore,
		link: URLS_PAGES.AUTH,
		name: 'Вход / Регистрация',
	},
]
