import { LANGUAGES, useI18n } from '../../i18n'

/*
  Three-way segmented control rather than a dropdown: with only three options
  it fits inline, needs no open/close state or click-outside handling, and
  every option is one tap away on a phone. Each segment clears the 44px tap
  target the rest of this page holds to.

  Styled for a dark surface — it currently only appears in the navbar. If it
  ever lands on one of the white sections it will need a light tone.
*/

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 ${className}`}
    >
      {LANGUAGES.map((option) => {
        const active = option.code === lang
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            /*
              `aria-pressed` rather than `aria-current`: this is a set of
              toggle buttons, not navigation. `lang` on each button tells a
              screen reader to pronounce the label in its own language, and
              `title` gives the full endonym behind the two-letter code.
            */
            aria-pressed={active}
            lang={option.code}
            title={option.name}
            className={`flex min-h-[44px] items-center rounded-full px-3 text-xs font-semibold transition-colors ${
              active ? 'bg-brand-500 text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            {option.short}
          </button>
        )
      })}
    </div>
  )
}
