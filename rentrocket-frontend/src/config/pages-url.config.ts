class URLS {
	private admin_zone = '/admin'
	private myspace_zone = '/myspace'

	INFO = '/info'
	AUTH = '/auth'
	REG = '/register'
	LOGOUT = '/logout'
	MYSPACE_FLATS = `${this.myspace_zone}/flats`
	MYSPACE_TAGS = `${this.myspace_zone}/tags`



	HOME = '/'
	MYSPACE = `${this.myspace_zone}`
	PROFILE = `/profile`
	HELP = '/help'

	ADMIN_DASHBOARD = `${this.admin_zone}`
	ADMIN_FLATS = `${this.admin_zone}/flats`

	ADMIN_SETTINGS = `${this.admin_zone}/settings`
	ADMIN_USERS = `${this.admin_zone}/users`
	ADMIN_TAGS = `${this.admin_zone}/tags`


}

export const URLS_PAGES = new URLS()
