import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { queryClient } from '~/app/App.tsx'
import { useCustomTranslation } from '~/feature/translation'
import { counterService } from '~/shared/api/counters.service.ts'
import { Routes } from '~/shared/constants'
import { useToast } from '~/shared/hooks'
import { Button, Typography } from '~/shared/ui'

export const AddNewCounter = () => {
  const { t } = useCustomTranslation()
  const navigate = useNavigate()
  const { showSuccessToast } = useToast()

  const [counterName, setCounterName] = useState<string>('')

  const createCounterMut = useMutation({
    mutationFn: counterService.createCounter,
    onSuccess: () => {
      console.info('[CreateCounter:onSuccess]')
      showSuccessToast(t('counterCreated'))
      queryClient.invalidateQueries({
        queryKey: ['counter'],
      })
      navigate(Routes.COUNTERS, { replace: true })
    },
    onError: (err) => {
      console.info(`[CreateCounter:onError]: ${JSON.stringify(err)}`)
    },
  })

  const createCounter = async () => {
    createCounterMut.mutate({ name: counterName, counter: 0 })
  }

  const isLoading = createCounterMut.isPending

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col items-center gap-3">
        <input
          type="text"
          name="counterName"
          id="counterName"
          placeholder="Counter Name"
          autoComplete="CounterName"
          className="bg-transparent focus:outline-none duration-300 h-[40px] placeholder-black/50 border-b-2 border-black hover:border-black/20 focus:border-black/50 w-[300px]"
          onChange={(e) => setCounterName(e.target.value)}
        />

        <div className="w-[300px] h-[45px]">
          <Button
            onClick={createCounter}
            classNames="bg-transparent border-black"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            <Typography
              text={t('createCounter')}
              classNames="font-semibold text-M italic"
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
