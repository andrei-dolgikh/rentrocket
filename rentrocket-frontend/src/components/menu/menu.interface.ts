import { Roles } from '@/types/auth.types'
import type { LucideIcon } from 'lucide-react'

export interface IMenuItem {
	id?: string
	link?: string
	name: string
	icon: LucideIcon
	access?: Roles[]
}
