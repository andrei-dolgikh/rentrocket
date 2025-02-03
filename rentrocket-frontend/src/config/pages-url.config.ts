class URLS {
	private admin_zone = '/admin'
	private myspace_zone = '/myspace'

	HOME = '/'
	MYSPACE = `${this.myspace_zone}`
	INFO = '/info'
	AUTH = '/auth'

	ADMIN_DASHBOARD = `${this.admin_zone}`
	ADMIN_FLATS = `${this.admin_zone}/flats`
	MYSPACE_FLATS = `${this.admin_zone}/flats`

	ADMIN_SETTINGS = `${this.admin_zone}/settings`
	ADMIN_USERS = `${this.admin_zone}/users`
	ADMIN_TAGS = `${this.admin_zone}/tags`
	MYSPACE_TAGS = `${this.myspace_zone}/tags`


}

export const URLS_PAGES = new URLS()
