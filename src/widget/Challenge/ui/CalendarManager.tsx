import { useCallback } from 'react'

import { Calendar } from './Calendar'
import { MetaText } from './MetaText'
import { Timer } from './Timer'
import { convertDate } from '../lib/convertDate'

import { useCustomTranslation } from '~/feature/translation'
import { ChallengeDTO, ProgressDTO } from '~/shared/api/challenge.service'
import { mapChallengeToItem } from '~/widget/ChallengeManager/lib/mappers.ts'

type Props = {
  challenge: ChallengeDTO
  progress: Array<ProgressDTO>

  addDayInStreak: (day: number) => void
  removeDayFromStreak: (checkinId: string) => void
}

export const CalendarManager = ({
  challenge,
  progress,
  addDayInStreak,
  removeDayFromStreak,
}: Props) => {
  const { t } = useCustomTranslation()

  const challengeBaseInfo = mapChallengeToItem(challenge)

  const onDayClick = useCallback(
    (day: number) => {
      const isDayAlreadyChecked = progress.map((el) => el.checkpointDate).includes(convertDate(day))

      if (!isDayAlreadyChecked) {
        addDayInStreak(day)
        return
      }

      const checkinId = progress.find((el) => el.checkpointDate === convertDate(day))?.id

      if (checkinId) {
        removeDayFromStreak(checkinId)
        return
      }
    },
    [addDayInStreak, progress, removeDayFromStreak],
  )

  return (
    <div>
      <div className="flex justify-between items-center">
        <MetaText leftLabel={`${t('goal')}: `} rightLabel={challengeBaseInfo.goal} />
        <MetaText
          leftLabel={`${t('daysLeft')}: `}
          rightLabel={String(challengeBaseInfo.daysLeft)}
        />
      </div>

      <Calendar
        streak={progress?.map((el) => el.checkpointDate) ?? []}
        onDayClick={onDayClick}
        isCompleted={!challengeBaseInfo.isActive}
      />

      {challengeBaseInfo.isActive ?? (
        <Timer streak={progress?.map((el) => el.checkpointDate) ?? []} />
      )}
    </div>
  )
}
