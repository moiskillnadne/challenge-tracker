import { api } from '~/shared/api/api.ts'
import { SuccessResponse } from '~/shared/api/types.ts'

interface CreateCounterPayload {
  name: string
  counter: number
}

interface CounterDTO {
  id: string
  name: string
  counter: number
}

interface CountersDTO {
  data: Array<CounterDTO>
}

interface SuccessCounterDTO {
  counter: CounterDTO
}

function createCounterService() {
  return {
    getCounters: () => {
      return api.get<SuccessResponse<CountersDTO>>('/protected/counter')
    },
    createCounter: (payload: CreateCounterPayload) => {
      return api.post('/protected/counter/create', payload)
    },
    incrementCounter: (counterId: string) => {
      return api.post(`/protected/counter/increment/${counterId}`)
    },
    getCounterById: (counterId: string) => {
      return api.get<SuccessResponse<SuccessCounterDTO>>(
        `/protected/counter/${counterId}`,
      )
    },
  }
}

export const counterService = createCounterService()
