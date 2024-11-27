import { useCustomTranslation } from '~/feature/translation'
import { ArchiveIcon } from '~/shared/icon'
import { Typography } from '~/shared/ui'

type Props = {
  onClick: () => void
}

export const ShowArchiveChallengesButton = ({ onClick }: Props) => {
  const { t } = useCustomTranslation()

  return (
    <button
      type="button"
      className="flex flex-col items-center opacity-50 mt-64 hover:opacity-75 cursor-pointer transition-opacity duration-300 ease-in-out"
      onClick={onClick}
    >
      <div className="h-[20px] w-[20px]">
        <ArchiveIcon classNames="stroke-black" />
      </div>
      <Typography
        text={t('completedChallenges')}
        classNames={'text-black font-semibold text-S italic'}
      />
    </button>
  )
}
