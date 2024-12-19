import { getDay, getDaysInMonth, getMonth, startOfMonth } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { CalendarDayItem } from './CalendarDayItem'
import { CalendarHeaderItem } from './CalendarHeaderItem'
import { convertDate } from '../lib/convertDate'

import { ChallengeType } from '~/entity/challenge'

type Props = {
  streak: string[]
  isCompleted: boolean
  onDayClick: (day: number) => void
  challengeType: ChallengeType
}

export const Calendar = ({
  streak,
  onDayClick,
  isCompleted,
  challengeType,
}: Props) => {
  const { t } = useTranslation()

  const now = new Date()

  const month = getMonth(isCompleted ? new Date(streak[0]) : now)

  const daysInMonth = getDaysInMonth(isCompleted ? new Date(streak[0]) : now)

  const firstDayOfMonth = getDay(startOfMonth(now))

  const daysOffset: Record<number, number> = {
    0: 6,
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
  }

  const offset = Array.from(
    { length: daysOffset[firstDayOfMonth] },
    (_, index) => index + 1,
  )
  const daysInMonthArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1,
  )

  return (
    <div className="pt-20 pb-12">
      <div className="grid grid-cols-7 gap-2">
        <CalendarHeaderItem
          label={t('days.monday')}
          challengeType={challengeType}
        />
        <CalendarHeaderItem
          label={t('days.tuesday')}
          challengeType={challengeType}
        />
        <CalendarHeaderItem
          label={t('days.wednesday')}
          challengeType={challengeType}
        />
        <CalendarHeaderItem
          label={t('days.thursday')}
          challengeType={challengeType}
        />
        <CalendarHeaderItem
          label={t('days.friday')}
          challengeType={challengeType}
        />
        <CalendarHeaderItem
          label={t('days.saturday')}
          challengeType={challengeType}
        />
        <CalendarHeaderItem
          label={t('days.sunday')}
          challengeType={challengeType}
        />
      </div>

      <div className="grid grid-cols-7 gap-2 mt-20">
        {offset?.map((index) => <div key={index}></div>)}

        {daysInMonthArray?.map((index) => (
          <CalendarDayItem
            key={index}
            challengeType={challengeType}
            label={index.toString()}
            isChecked={streak.includes(convertDate(index, month))}
            onClick={() => {
              onDayClick(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}
