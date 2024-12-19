import { useCallback } from 'react'

import { Calendar } from './Calendar'
import { Timer } from './Timer'
import { convertDate } from '../lib/convertDate'

import { ChallengeType } from '~/entity/challenge'
import { ProgressDTO } from '~/shared/api/challenge.service'
import { ChallengeItem } from '~/widget/ChallengeManager/lib/mappers.ts'

type Props = {
  challengeType: ChallengeType
  challenge: ChallengeItem
  progress: Array<ProgressDTO>

  addDayInStreak: (day: number) => void
  removeDayFromStreak: (checkinId: string) => void
}

export const CalendarManager = ({
  challenge,
  progress,
  addDayInStreak,
  removeDayFromStreak,
  challengeType,
}: Props) => {
  const onDayClick = useCallback(
    (day: number) => {
      const isDayAlreadyChecked = progress
        .map((el) => el.checkpointDate)
        .includes(convertDate(day))

      if (!isDayAlreadyChecked) {
        addDayInStreak(day)
        return
      }

      const checkinId = progress.find(
        (el) => el.checkpointDate === convertDate(day),
      )?.id

      if (checkinId) {
        removeDayFromStreak(checkinId)
        return
      }
    },
    [addDayInStreak, progress, removeDayFromStreak],
  )

  return (
    <div>
      <Calendar
        challengeType={challengeType}
        streak={progress?.map((el) => el.checkpointDate) ?? []}
        onDayClick={onDayClick}
        isCompleted={!challenge.isActive}
      />

      {challenge.isActive ?? (
        <Timer streak={progress?.map((el) => el.checkpointDate) ?? []} />
      )}
    </div>
  )
}
