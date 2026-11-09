export type Language = 'ar' | 'en'
export type Theme = 'light' | 'dark'

export function readingPreferences(search = ''): { language: Language; theme: Theme } {
  const params = new URLSearchParams(search)
  return {
    language: params.get('lang') === 'en' ? 'en' : 'ar',
    theme: params.get('theme') === 'dark' ? 'dark' : 'light',
  }
}

export function readingLink(language: Language, theme: Theme) {
  return '?lang=' + language + '&theme=' + theme
}

export function applyReadingPreferences(language: Language, theme: Theme) {
  document.documentElement.lang = language
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.dataset.theme = theme
  document.title = language === 'ar' ? 'The Transformers manual | شرح Transformers بالعربية' : 'The Transformers manual | Transformers, explained'
}
