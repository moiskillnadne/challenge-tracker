import { CalendarManager } from './CalendarManager'
import { useStreakState } from '../lib/useStreakState'

import Logo from '~/assets/logo1.png'
import { PageLoader } from '~/shared/ui'

type Props = {
  challengeId: string
}

export const ChallengeWidget = ({ challengeId }: Props) => {
  const { challenge, isLoading, addDayInStreak, removeDayFromStreak } = useStreakState({
    challengeId,
  })

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-1 justify-center overflow-y-scroll">
      <div className="w-[500px] px-[16px]">
        <div className="flex justify-center items-center py-[18px] px-[24px]">
          <img className="w-[400px]" src={Logo} alt="" />
        </div>

        {!!challenge && (
          <CalendarManager
            challenge={challenge}
            progress={challenge.progress}
            addDayInStreak={addDayInStreak}
            removeDayFromStreak={removeDayFromStreak}
          />
        )}
      </div>
    </div>
  )
}
