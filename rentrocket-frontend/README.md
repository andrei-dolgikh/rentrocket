## Description

Rentrocket Frontend.


## Installation
npm install

## Create .env file
NEXT_PUBLIC_BACKEND_URL="http://localhost:4200"
NEXT_PUBLIC_CAPTCHA_SITE_KEY="726e6972-a796-4d60-abca-bbec8a145842"
NEXT_PUBLIC_TOKEN_DOMAIN="localhost"
#NEXT_PUBLIC_TOKEN_DOMAIN=".lockshield.online"

## Running frontend locally
npm run dev


Деплой (неактуальнос  переходом на env)

Заменить адрес бэкенда в .env, далее
/src/service/auth-token.service.ts
заменить функцию

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: '.lockshield.online',
		sameSite: 'none',
		secure: true, 
		expires: 1,
	})
}


query keys

flats
user

Mutation 

accept invitation
reject invitation
update user', key