import { createContext, useContext, useState, type ReactNode } from "react"
import { translations, type Lang } from "@/lib/translations"

type LanguageContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  t: (typeof translations)["fr"]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr")

  const toggleLang = () => setLang((prev) => (prev === "fr" ? "en" : "fr"))

  const value: LanguageContextType = {
    lang,
    setLang,
    toggleLang,
    t: translations[lang],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
