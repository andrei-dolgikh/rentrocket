import { NextRequest, NextResponse } from 'next/server'

import { URLS_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-token.service'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const isAuthPage = url.includes('/auth')
  
	// Извлекаем язык из URL
	const lang = url.split('/')[3] // Предполагая, что язык всегда третий сегмент в URL
  
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
	  '/:lang/myspace',
	  '/:lang/myspace/:path*',
	  '/:lang/profile',
	  '/:lang/admin',
	  '/:lang/admin/:path*',
	  '/:lang/auth/:path*'
	]
  }
