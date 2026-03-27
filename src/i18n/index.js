import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import sr from './sr'
import de from './de'

const detectLanguage = () => {
  const saved = localStorage.getItem('takumi_lang')
  if (saved && ['en', 'sr', 'de'].includes(saved)) return saved

  const nav = navigator.language || navigator.userLanguage || 'en'
  const lang = nav.toLowerCase()
  const base = lang.split('-')[0]
  const region = lang.split('-')[1] || ''

  // Serbian region: Serbian, Bosnian, Croatian, Montenegrin
  if (['sr', 'bs', 'hr', 'cnr', 'sh'].includes(base)) return 'sr'
  // German region: German, Austrian, Swiss
  if (base === 'de') return 'de'
  if (['gsw', 'lb'].includes(base)) return 'de'
  if (base === 'en' && ['at', 'ch'].includes(region)) return 'de'

  return 'en'
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      sr: { translation: sr },
      de: { translation: de },
    },
    lng: detectLanguage(),
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

export const setLanguage = (lang) => {
  i18n.changeLanguage(lang)
  localStorage.setItem('takumi_lang', lang)
}

export default i18n
