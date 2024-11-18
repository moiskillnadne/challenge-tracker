import { useState } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { ChallengeGridItem } from './ChallengeGridItem'
import { ChallengeManagerHeader } from './ChallengeManagerHeader'

import { useCustomTranslation } from '~/feature/translation'
import { challengeService } from '~/shared/api/challenge.service'
import { EditIcon } from '~/shared/icon'
import { Button, Typography } from '~/shared/ui'
import { Loader } from '~/shared/ui/Loader'
import { mapChallengeToItem } from '~/widget/Account/lib/mappers'

export const ChallengeManager = () => {
  const navigate = useNavigate()
  const { t } = useCustomTranslation()

  const [isRemoveMode, setIsRemoveMode] = useState<boolean>(false)

  const query = useQuery({
    queryKey: ['/protected/challenge/'],
    queryFn: challengeService.getChallengeList,
    select: (data) => data.data.details,
  })

  const removeChallengeMutation = useMutation({
    mutationFn: challengeService.deleteChallenge,
    onSuccess: () => {
      query.refetch()
    },
  })

  const challenges = query.data?.challenges

  if (query.isPending) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="flex-1 mt-[36px] px-[12px]">
      <ChallengeManagerHeader />

      <div className="w-full flex flex-col items-center">
        <div className="flex gap-[24px] items-center">
          <Typography
            text={t('currentChallenges')}
            classNames="text-center font-semibold text-[20px] italic cursor-default flex-1"
          />

          {!isRemoveMode && (
            <button
              type="button"
              className="w-[22px] h-[22px] hover:scale-110 transition-all duration-300 ease-in-out"
              onClick={() => setIsRemoveMode(true)}
            >
              <EditIcon classNames="stroke-black" />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-[8px] mt-[24px]">
          {challenges &&
            challenges
              .map((item) => mapChallengeToItem(item))
              .map((item) => {
                const isInRemovingProcess = removeChallengeMutation.variables === item.id

                return (
                  <ChallengeGridItem
                    key={item.id}
                    goal={item.goal}
                    onClick={() => {
                      return navigate(`/challenge/${item.id}`)
                    }}
                    isRemoveMode={isRemoveMode}
                    onRemove={() => removeChallengeMutation.mutate(item.id)}
                    isLoading={isInRemovingProcess && removeChallengeMutation.isPending}
                    isDisabled={removeChallengeMutation.isPending}
                  />
                )
              })}
        </div>

        {isRemoveMode && (
          <div>
            <Button
              label={t('done')}
              onClick={() => setIsRemoveMode(false)}
              classNames="mt-[24px] py-[8px] px-[16px] border-black uppercase text-[20px] font-semibold transition-all duration-300 ease-in-out hover:bg-black/10"
            />
          </div>
        )}
      </div>
    </div>
  )
}
