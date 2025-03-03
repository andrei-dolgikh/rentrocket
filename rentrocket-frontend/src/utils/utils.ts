
export function createLocalizedUrl(lang: string, path: string): string {
	// Убираем начальный слеш, если он есть
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;
	
	// Проверяем, начинается ли путь с кода языка
	if (cleanPath.startsWith(lang + '/') || cleanPath === lang) {
	  return '/' + cleanPath;
	}
	
	return `/${lang}/${cleanPath}`;
  }