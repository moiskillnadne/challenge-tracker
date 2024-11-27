import { useCustomTranslation } from '~/feature/translation'

export const LanguageSwitcher = () => {
  const { switchLanguage, language } = useCustomTranslation()

  return (
    <button className="font-bold text-XL cursor-pointer text-black" onClick={switchLanguage}>
      {language.toUpperCase()}
    </button>
  )
}
