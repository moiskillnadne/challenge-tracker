import { api } from './api'
import { SuccessResponse } from './types'

export type ChallengeDTO = {
  id: string
  goal: string
  startedAtDate: string // "2024-09-01"
  duration: number // 30
  description: string | null
  userId: string
  createdAt: string // "2024-10-01T21:16:47.497Z"
  updatedAt: string // "2024-10-01T21:16:47.497Z"
  progress: Array<ProgressDTO>
}

export type ProgressDTO = {
  id: string
  checkpointDate: string // "2024-09-01"
  createdAt: string // "2024-10-01T21:16:47.497Z"
  updatedAt: string // "2024-10-01T21:16:47.497Z"
  userChallengeId: string
}

type CreateChallengePayload = {
  goal: string
  startedAtDate: string // "2024-09-01"
  duration: number // 30
  description: string | null
}

type CheckinPayload = {
  checkpointDate: string // "2024-09-01"
  userChallengeId: string
}

function createChallengeService() {
  return {
    getChallengeList() {
      return api.get<SuccessResponse<Record<'challenges', Array<ChallengeDTO>>>>(
        '/protected/challenge/',
      )
    },
    getChallengeById(challengeId: string) {
      return api.get<SuccessResponse<Record<'challenge', ChallengeDTO>>>(
        `/protected/challenge/${challengeId}`,
      )
    },
    createChallenge(payload: CreateChallengePayload) {
      return api.post('/protected/challenge/create', payload)
    },
    deleteChallenge(challengeId: string) {
      return api.delete(`/protected/challenge/${challengeId}`)
    },
    checkin(payload: CheckinPayload) {
      return api.post('/protected/challenge/check-in', payload)
    },
    removeCheckin(checkinId: string) {
      return api.delete(`/protected/challenge/check-in/${checkinId}`)
    },
  }
}

export const challengeService = createChallengeService()
