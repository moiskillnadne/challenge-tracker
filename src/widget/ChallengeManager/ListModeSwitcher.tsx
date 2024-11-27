import { useCustomTranslation } from '~/feature/translation'
import { RightArrow } from '~/shared/icon'
import { Typography } from '~/shared/ui'

type Props = {
  isExtended: boolean
  onClick: () => void
}

export const ListModeSwitcher = ({ onClick, isExtended }: Props) => {
  const { t } = useCustomTranslation()

  return (
    <button
      type="button"
      className="flex items-center justify-center gap-[12px] transition-opacity duration-300 hover:cursor-pointer hover:opacity-50"
      onClick={onClick}
    >
      <Typography
        text={isExtended ? t('hide') : t('showMore')}
        classNames="font-semibold text-S italic lowercase"
      />
      <div className="h-[20px] w-[20px]">
        <RightArrow
          classNames={`stroke-black transition-rotate duration-300 easy-in-out  ${isExtended ? 'rotate-270' : 'rotate-90'}`}
        />
      </div>
    </button>
  )
}
