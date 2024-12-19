import { useNavigate } from 'react-router-dom'

import { ChallengeType } from '~/entity/challenge'
import { Routes } from '~/shared/constants'
import { BackArrowIcon } from '~/shared/icon'
import { getNavigationButtonColor } from '~/widget/Challenge/lib/theme-manager.ts'

type Props = {
  challengeType: ChallengeType
}

export const ChallengeHeader = ({ challengeType }: Props) => {
  const navigate = useNavigate()

  return (
    <div className="w-full px-24 py-12 relative">
      <div
        id="challenge-manager-header-layer-1"
        className="flex items-start z-10 absolute top-0 left-0 w-full px-24 py-12 justify-between"
      >
        <button
          type="button"
          className="cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
          aria-label="logout"
          onClick={() => navigate(Routes.HOME)}
        >
          <div className="w-[29px] h-[29px]">
            <BackArrowIcon
              classNames={`${getNavigationButtonColor(challengeType)}`}
            />
          </div>
        </button>
      </div>
    </div>
  )
}
