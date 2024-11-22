import { useMemo, useState } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { ChallengeGridItem } from './ChallengeGridItem'
import { ChallengeManagerHeader } from './ChallengeManagerHeader'

import { useCustomTranslation } from '~/feature/translation'
import { challengeService } from '~/shared/api/challenge.service'
import { ArchiveIcon, EditIcon, RightArrow } from '~/shared/icon'
import { Button, PageLoader, Typography } from '~/shared/ui'
import { mapChallengeToItem } from '~/widget/Account/lib/mappers'

export const ChallengeManager = () => {
  const navigate = useNavigate()
  const { t } = useCustomTranslation()

  const [isRemoveMode, setIsRemoveMode] = useState<boolean>(false)
  const [isActiveChallengesShow, setIsActiveChallengesShow] = useState<boolean>(true)
  const [isExtendedList, setIsExtendedList] = useState<boolean>(false)

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

  const challenges = useMemo(() => query.data?.challenges ?? [], [query.data?.challenges])

  const activeChallenges = useMemo(() => {
    return challenges.map((item) => mapChallengeToItem(item)).filter((item) => item.isActive)
  }, [challenges])

  const filteredActiveChallenges = useMemo(() => {
    return isExtendedList ? activeChallenges : activeChallenges.slice(0, 3)
  }, [activeChallenges, isExtendedList])

  const completedChallenges = useMemo(() => {
    return challenges.map((item) => mapChallengeToItem(item)).filter((item) => !item.isActive)
  }, [challenges])

  const currentShownChallenges = isActiveChallengesShow
    ? filteredActiveChallenges
    : completedChallenges

  if (query.isPending) {
    return <PageLoader />
  }

  return (
    <div className="flex-1 mt-[36px] px-[12px]">
      <ChallengeManagerHeader />

      <div className="flex flex-1 flex-col items-center">
        <div className="flex gap-[24px] items-center">
          <Typography
            text={isActiveChallengesShow ? t('currentChallenges') : t('completedChallenges')}
            classNames="text-center font-semibold text-[20px] italic cursor-default flex-1"
          />

          {!isRemoveMode && isActiveChallengesShow && (
            <button
              type="button"
              className="w-[22px] h-[22px] hover:scale-110 transition-all duration-300 ease-in-out"
              onClick={() => setIsRemoveMode(true)}
            >
              <EditIcon classNames="stroke-black" />
            </button>
          )}
        </div>

        <div className={`flex flex-col gap-[8px] mt-[24px]`}>
          <div
            className={`flex flex-col px-[16px] gap-[8px] ${isExtendedList ? 'overflow-y-scroll' : 'overflow-y-hidden'} ${isExtendedList ? 'h-[350px]' : 'h-[180px]'} ${isExtendedList ? 'custom-scrollbar custom-scrollbar-always' : ''}`}
          >
            {currentShownChallenges.map((item) => {
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

          <button
            type="button"
            className="flex items-center justify-center gap-[12px] transition-opacity duration-300 hover:cursor-pointer hover:opacity-50"
            onClick={() => setIsExtendedList((prev) => !prev)}
          >
            <Typography
              text={isExtendedList ? t('hide') : t('showMore')}
              classNames="font-semibold text-[14px] italic lowercase"
            />
            <div className="h-[20px] w-[20px]">
              <RightArrow
                classNames={`stroke-black transition-rotate duration-300 easy-in-out  ${isExtendedList ? 'rotate-270' : 'rotate-90'}`}
              />
            </div>
          </button>
        </div>

        {!isRemoveMode && isActiveChallengesShow && (
          <button
            type="button"
            className="flex flex-col items-center opacity-50 mt-[64px] hover:opacity-75 cursor-pointer transition-opacity duration-300 ease-in-out"
            onClick={() => setIsActiveChallengesShow(false)}
          >
            <div className="h-[20px] w-[20px]">
              <ArchiveIcon classNames="stroke-black" />
            </div>
            <Typography
              text={t('completedChallenges')}
              classNames={'text-black font-semibold text-[14px] italic'}
            />
          </button>
        )}

        {!isRemoveMode && !isActiveChallengesShow && (
          <button
            type="button"
            className="flex flex-col items-center opacity-50 mt-[64px] hover:opacity-75 cursor-pointer transition-opacity duration-300 ease-in-out"
            onClick={() => setIsActiveChallengesShow(true)}
          >
            <Typography
              text={t('currentChallenges')}
              classNames={'text-black font-semibold text-[14px] italic'}
            />
          </button>
        )}

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
