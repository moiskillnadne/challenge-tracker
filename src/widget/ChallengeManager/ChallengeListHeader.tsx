import { useCustomTranslation } from '~/feature/translation'
import { EditIcon } from '~/shared/icon'
import { Typography } from '~/shared/ui'

type Props = {
  isActiveChallengesShow: boolean
  isRemoveMode: boolean
  onEditIconClick: () => void
}

export const ChallengeListHeader = ({
  isActiveChallengesShow,
  isRemoveMode,
  onEditIconClick,
}: Props) => {
  const { t } = useCustomTranslation()

  return (
    <div className="flex gap-[24px] items-center">
      <Typography
        text={isActiveChallengesShow ? t('currentChallenges') : t('completedChallenges')}
        classNames="text-center font-semibold text-M italic cursor-default flex-1"
      />

      {!isRemoveMode && isActiveChallengesShow && (
        <button
          type="button"
          className="w-[22px] h-[22px] hover:scale-110 transition-all duration-300 ease-in-out"
          onClick={onEditIconClick}
        >
          <EditIcon classNames="stroke-black" />
        </button>
      )}
    </div>
  )
}
