import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { queryClient } from '~/app/App.tsx'
import { useCustomTranslation } from '~/feature/translation'
import { counterService } from '~/shared/api/counters.service.ts'
import { Button, PageLoader, Typography } from '~/shared/ui'
import { useCounterQuery } from '~/widget/Counters/lib/useCounterQuery.ts'

export const Counter = () => {
  const { counterId } = useParams()
  const { t } = useCustomTranslation()

  const counterQuery = useCounterQuery(counterId ?? 'undefined')

  const counterMut = useMutation({
    mutationFn: () => counterService.incrementCounter(counterId ?? 'undefined'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['counter', counterId],
      })
    },
  })

  const incrementCounter = () => {
    counterMut.mutate()
  }

  const counterData = counterQuery.data?.data.details.counter

  if (counterQuery.isPending) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col items-center gap-3">
        <Typography
          text={`${counterData?.name} - ${counterData?.counter}`}
          classNames="font-semibold text-M italic text-center"
        />

        <div className="w-[300px] h-[45px]">
          <Button
            onClick={incrementCounter}
            classNames="bg-transparent border-black"
            isLoading={counterMut.isPending}
            isDisabled={counterMut.isPending}
          >
            <Typography
              text={t('incrementCounter')}
              classNames="font-semibold text-M italic"
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
