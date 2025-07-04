import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Register } from './Register'

export const metadata: Metadata = {
	title: 'Регистрация',
	...NO_INDEX_PAGE
}

export default function RegisterPage() {
	return <Register />
}
