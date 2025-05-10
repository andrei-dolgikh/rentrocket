
export function createLocalizedUrl(lang: string, path?: string): string {
	if (!path) return `/${lang}`;

	if (typeof path === 'string') {
		if (path.startsWith('/')) {
			return `/${lang}${path}`;
		}
		return `/${lang}/${path}`;
	}

	console.error('Invalid path passed to createLocalizedUrl:', path);
	return `/${lang}`;
}

export function getRandomColor(id: string): "primary" | "secondary" | "success" | "warning" | "danger" {
	const colors: Array<"primary" | "secondary" | "success" | "warning" | "danger"> =
		["primary", "secondary", "success", "warning", "danger"];

	const sum = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0);

	const colorIndex = sum % colors.length;

	return colors[colorIndex];
}