import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import uz from './locales/uz'
import ru from './locales/ru'
import en from './locales/en'

/*
  Minimal i18n for this page — a context, a dictionary per language, and a
  dot-path lookup. No i18n library: the whole site is one static page with no
  routing, no pluralisation rules and no runtime-loaded catalogues, so
  react-i18next would add a dependency and a config surface to do less than
  the 80 lines below.

  Uzbek is the default and the fallback. The visitor's browser language is
  deliberately NOT sniffed: everyone lands on Uzbek unless they have
  explicitly chosen another language before (which is remembered). To switch
  to browser detection instead, give `readStoredLang` a `navigator.languages`
  branch before its final return.
*/

export const DICTS = { uz, ru, en }
export const DEFAULT_LANG = 'uz'

// Order here is the order the switcher renders.
export const LANGUAGES = [
  { code: 'uz', short: 'UZ', name: "O'zbekcha" },
  { code: 'ru', short: 'RU', name: 'Русский' },
  { code: 'en', short: 'EN', name: 'English' },
]

const STORAGE_KEY = 'aylo-lang'

function readStoredLang() {
  // localStorage throws in Safari private mode and when cookies are blocked.
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && DICTS[saved]) return saved
  } catch {
    /* ignore — fall through to the default */
  }
  return DEFAULT_LANG
}

function resolve(dict, path) {
  return path.split('.').reduce((node, key) => (node == null ? undefined : node[key]), dict)
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang)

  const setLang = useCallback((next) => {
    if (!DICTS[next]) return
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore — the choice just won't survive a reload */
    }
  }, [])

  /*
    `lang` on <html> is what screen readers use to pick a voice and what
    search engines read, so it has to track the active language rather than
    stay at the "en" hardcoded in index.html. Title and description are
    updated for the same reason — this is a single page, so the static tags
    in index.html would otherwise always describe the site in English.

    og:/twitter: tags are left alone on purpose: crawlers read the served
    HTML and never run this effect, so rewriting them would change nothing
    for shares while making the DOM disagree with what was crawled.
  */
  useEffect(() => {
    const meta = DICTS[lang].meta
    document.documentElement.lang = lang
    document.title = meta.title
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', meta.description)
  }, [lang])

  /*
    `t` returns whatever sits at the path — a string, or an array/object for
    repeated content like feature or pricing lists. Missing keys fall back to
    Uzbek and then to the path itself, so a gap shows up as a visible key
    rather than as `undefined` in the markup.

    `vars` interpolates `{name}` placeholders (used for the HTTP status code
    in the contact form's error copy and the year in the footer).
  */
  const t = useCallback(
    (path, vars) => {
      const value = resolve(DICTS[lang], path) ?? resolve(DICTS[DEFAULT_LANG], path) ?? path
      if (typeof value !== 'string' || !vars) return value
      return value.replace(/\{(\w+)\}/g, (whole, key) =>
        key in vars ? String(vars[key]) : whole,
      )
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>')
  return ctx
}

/* Convenience for the common case of only needing the lookup function. */
export function useT() {
  return useI18n().t
}
