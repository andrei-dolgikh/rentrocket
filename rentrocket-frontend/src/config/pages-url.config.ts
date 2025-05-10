class URLS {
	private admin_zone = '/admin'
	private myspace_zone = '/myspace'

	INFO = '/info'
	AUTH = '/auth'
	REG = '/register'
	LOGOUT = '/logout'

	MYSPACE_FLATS = `${this.myspace_zone}/flats`
    MYSPACE_FLATS_HK(lang: string) { 
        return this.getUrl(lang, `${this.myspace_zone}/flats`) 
    }



	HOME = '/'
	MYSPACE = `${this.myspace_zone}`
	PROFILE = `/profile`
	PROFILE_UPDATE = `/profile/update`
	HELP = '/help'

	ADMIN_DASHBOARD = `${this.admin_zone}`
	ADMIN_FLATS = `${this.admin_zone}/flats`

	ADMIN_SETTINGS = `${this.admin_zone}/settings`
	ADMIN_USERS = `${this.admin_zone}/users`
	ADMIN_TAGS = `${this.admin_zone}/tags`

	getUrl(lang: string, path: string) {
        return `/${lang}${path}`
    }

}

export const URLS_PAGES = new URLS()
