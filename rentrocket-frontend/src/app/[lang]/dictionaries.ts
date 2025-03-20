import 'server-only'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ru: () => import('./dictionaries/ru.json').then((module) => module.default),
}

export async function getDictionary(locale: "en" | "ru") {
  if (!Object.keys(dictionaries).includes(locale)) {
    return dictionaries['en']()
  }
  return dictionaries[locale]()
}
