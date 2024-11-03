import { PropsWithChildren } from 'react'

import { useTranslation } from 'react-i18next'

type Props = PropsWithChildren<{
  text?: string
  classNames?: string
}>

export const Typography = (props: Props) => {
  const { i18n } = useTranslation()

  const language = i18n.language as 'en' | 'ru'

  const fontFamilyMap = {
    en: 'text-en',
    ru: 'text-ru',
  }

  return (
    <div className={`${fontFamilyMap[language]} ${props.classNames}`}>
      {props.text ?? props.children}
    </div>
  )
}
