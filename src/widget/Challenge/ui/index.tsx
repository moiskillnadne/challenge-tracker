import { CalendarManager } from './CalendarManager'
import { useStreakState } from '../lib/useStreakState'

import { ChallengeType } from '~/entity/challenge'
import { useCustomTranslation } from '~/feature/translation'
import { PageLoader, Typography } from '~/shared/ui'
import { ChallengeHeader } from '~/widget/Challenge/ChallengeHeader.tsx'
import { getMonthFromStartedAtDate } from '~/widget/Challenge/getMonthFromStartedAtDate.ts'
import {
  getHeaderTextColor,
  getMonthTextColor,
  getTextColor,
} from '~/widget/Challenge/lib/theme-manager.ts'
import { mapChallengeToItem } from '~/widget/ChallengeManager/lib/mappers.ts'

type Props = {
  challengeType: ChallengeType
  challengeId: string
}

export const ChallengeWidget = ({ challengeId, challengeType }: Props) => {
  const { language, t } = useCustomTranslation()

  const { challengeDTO, isLoading, addDayInStreak, removeDayFromStreak } =
    useStreakState({
      challengeId,
    })

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div className="flex-1 mt-36 px-12 pb-12 overflow-y-scroll">
      <ChallengeHeader challengeType={challengeType} />

      <div className="flex flex-1 justify-center">
        <div className="w-[500px] px-[16px]">
          {!!challengeDTO && (
            <div className="flex flex-col justify-center items-center py-[18px] px-[24px]">
              <Typography
                text={challengeDTO.goal}
                classNames={`text-[48px] font-bold ${getHeaderTextColor(challengeType)} cursor-default`}
              />
              <Typography
                text={getMonthFromStartedAtDate(
                  challengeDTO.startedAtDate,
                  language,
                )}
                classNames={`text-XXL font-extralight ${getMonthTextColor(challengeType)} cursor-default lowercase`}
              />
              <Typography
                text={`${t('daysLeft')}: ${mapChallengeToItem(challengeDTO).daysLeft}`}
                classNames={`text-L font-extralight ${getTextColor(challengeType)} cursor-default`}
              />
            </div>
          )}

          {!!challengeDTO && (
            <CalendarManager
              challengeType={challengeType}
              challenge={mapChallengeToItem(challengeDTO)}
              progress={challengeDTO.progress}
              addDayInStreak={addDayInStreak}
              removeDayFromStreak={removeDayFromStreak}
            />
          )}
        </div>
      </div>
    </div>
  )
}
