import { NextRequest, NextResponse } from 'next/server'

import { URLS_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-token.service'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const isAuthPage = url.includes('/auth')

	const pathname = request.nextUrl.pathname
	const pathnameElements = pathname.split('/').filter(Boolean)
	const lang = pathnameElements[0]

	// Редирект на английскую версию, если язык не указан
	if (!lang || !['en', 'ru'].includes(lang)) {  
		return NextResponse.redirect(new URL(`/en${pathname}`, url))
	}

	// Остальная логика остается без изменений
	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(`/${lang}${URLS_PAGES.MYSPACE}`, url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL(`/${lang}/auth`, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/', 
		'/:lang',  
		'/:lang/myspace',
		'/:lang/myspace/:path*',
		'/:lang/profile',
		'/:lang/admin',
		'/:lang/admin/:path*',
		'/:lang/auth/:path*'
	]
}