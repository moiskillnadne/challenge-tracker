import { useCustomTranslation } from '../lib/useCustomTranslation'

export const LanguageSwitcher = () => {
  const { switchLanguage, language } = useCustomTranslation()

  return (
    <button className="font-bold text-[26px] cursor-pointer text-black" onClick={switchLanguage}>
      {language.toUpperCase()}
    </button>
  )
}
