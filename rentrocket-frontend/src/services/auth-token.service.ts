
import Cookies from 'js-cookie'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

export const getAccessToken = () => {
	if (typeof window !== 'undefined') {
	  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
	  return accessToken || null;
	} else {
	  return null;
	}
  };
export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: '.lockshield.online',
		// domain: 'localhost',
		sameSite: 'none',
		secure: true, 
		expires: 1,
	})
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
}
