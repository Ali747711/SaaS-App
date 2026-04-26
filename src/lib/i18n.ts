import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "@/locales/en.json"
import uz from "@/locales/uz.json"
import ko from "@/locales/ko.json"

export const SUPPORTED_LANGUAGES = ["en", "uz", "ko"] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]

const STORAGE_KEY = "app-language"

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en"
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED_LANGUAGES.includes(stored as Language)) {
    return stored as Language
  }
  const browser = window.navigator.language.slice(0, 2)
  if (SUPPORTED_LANGUAGES.includes(browser as Language)) {
    return browser as Language
  }
  return "en"
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    uz: { translation: uz },
    ko: { translation: ko },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lng)
    window.document.documentElement.lang = lng
  }
})

if (typeof window !== "undefined") {
  window.document.documentElement.lang = i18n.language
}

export default i18n
