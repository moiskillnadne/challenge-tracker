import { ChallengeDTO } from '~/shared/api/challenge.service'

export type ChallengeItem = {
  id: string
  type: string
  goal: string
  daysLeft: number
  isActive: boolean
}

export const mapChallengeToItem = (challenge: ChallengeDTO): ChallengeItem => {
  const startedAt = new Date(challenge.startedAtDate)

  const endAt = new Date(startedAt)
  endAt.setDate(startedAt.getDate() + challenge.duration)

  const today = new Date()
  const timeDiff = endAt.getTime() - today.getTime()
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24))

  return {
    id: challenge.id,
    type: challenge.type,
    goal: challenge.goal,
    daysLeft: daysLeft < 0 ? 0 : daysLeft,
    isActive: challenge.status === 'ACTIVE',
  }
}
