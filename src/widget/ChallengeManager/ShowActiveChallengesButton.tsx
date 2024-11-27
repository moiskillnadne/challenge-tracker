import { useCustomTranslation } from '~/feature/translation'
import { Typography } from '~/shared/ui'

type Props = {
  onClick: () => void
}

export const ShowActiveChallengesButton = ({ onClick }: Props) => {
  const { t } = useCustomTranslation()

  return (
    <button
      type="button"
      className="flex flex-col items-center opacity-50 mt-[64px] hover:opacity-75 cursor-pointer transition-opacity duration-300 ease-in-out"
      onClick={onClick}
    >
      <Typography
        text={t('currentChallenges')}
        classNames={'text-black font-semibold text-S italic'}
      />
    </button>
  )
}
