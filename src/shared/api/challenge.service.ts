import { api } from './api'
import { SuccessResponse } from './types'

export type ChallengeDTO = {
  id: string
  goal: string
  startedAtDate: string // "2024-09-01"
  duration: number // 30
  description: string | null
  type: string
  userId: string
  createdAt: string // "2024-10-01T21:16:47.497Z"
  updatedAt: string // "2024-10-01T21:16:47.497Z"
  progress: Array<ProgressDTO>
  status: 'ACTIVE' | 'COMPLETED'
}

export type ChallengeListDTO = {
  data: Array<ChallengeDTO>
  meta: {
    currentPage: number
    nextPage: number | null
    prevPage: number | null
    totalPages: number
    totalRecords: number
  }
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
  type: string
  status: 'ACTIVE'
}

type CheckinPayload = {
  checkpointDate: string // "2024-09-01"
  userChallengeId: string
}

export type ChallengeListQueryParams = {
  status: 'ACTIVE' | 'COMPLETED'
  page: number
  limit: number
}

function createChallengeService() {
  return {
    getChallengeList(params: ChallengeListQueryParams) {
      return api.get<SuccessResponse<ChallengeListDTO>>(
        `/protected/challenge?status=${params.status}&page=${params.page}&limit=${params.limit}`,
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
