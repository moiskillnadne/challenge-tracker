import { SupportableLanguage } from '~/app/system/constant.ts'
import { useCustomTranslation } from '~/feature/translation'
import { ListItem } from '~/shared/ui'

export const LanguageSetting = () => {
  const { t, changeLanguage, language } = useCustomTranslation()

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col items-center gap-3">
        <ListItem
          label={t('languages.russian')}
          onClick={() => changeLanguage(SupportableLanguage.RU)}
          isActive={language === SupportableLanguage.RU}
        />
        <ListItem
          label={t('languages.english')}
          onClick={() => changeLanguage(SupportableLanguage.EN)}
          isActive={language === SupportableLanguage.EN}
        />
      </div>
    </div>
  )
}
