import { NextRequest, NextResponse } from 'next/server'
import { URLS_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-token.service'

export async function middleware(request: NextRequest) {
	const { url, cookies } = request
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const isAuthPage = url.includes('/auth')

	const pathname = request.nextUrl.pathname
	const pathnameElements = pathname.split('/').filter(Boolean)
	const lang = pathnameElements[0]

	// Проверка языка и редирект на /en, если язык не указан или некорректен
	if (!lang || !['en', 'ru'].includes(lang)) {  
		return NextResponse.redirect(new URL(`/en`, url))
	}

	// Проверка, является ли текущий путь главной страницей (/ или /:lang)
	const isHomePage = pathname === '/' || pathname === `/${lang}`
	
	// Если это главная страница, не проверяем авторизацию
	if (isHomePage) {
		return NextResponse.next()
	}

	// Редирект с auth страниц на myspace, если пользователь уже авторизован
	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(`/${lang}/${URLS_PAGES.MYSPACE}`, url))
	}

	// Разрешаем доступ к страницам авторизации
	if (isAuthPage) {
		return NextResponse.next()
	}

	// Для всех остальных защищенных маршрутов проверяем наличие токена
	if (!refreshToken) {
		return NextResponse.redirect(new URL(`/${lang}/auth`, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		`/((?!api|_next/static|_next/image|favicon.ico).*)` 
	]
}