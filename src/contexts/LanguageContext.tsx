import { createContext, useContext, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { Language } from '@/types'
import { storage, STORAGE_KEYS } from '@/utils/storage'

interface LanguageContextType {
  language: Language
  changeLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()
  const isInitialized = useRef(false)

  const language = (i18n.language as Language) || 'en'

  // Initialize language from storage only once on mount
  useEffect(() => {
    if (!isInitialized.current) {
      const saved = storage.get<Language>(STORAGE_KEYS.LANGUAGE)
      if (saved && saved !== i18n.language) {
        i18n.changeLanguage(saved)
      }
      isInitialized.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr')
    root.setAttribute('lang', language)
    // Only save to storage if language was changed by user, not on initial load
    if (isInitialized.current) {
      storage.set(STORAGE_KEYS.LANGUAGE, language)
    }
  }, [language])

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

