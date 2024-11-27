import { useMemo, useState } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { ChallengeGridItem } from './ChallengeGridItem'
import { ChallengeManagerHeader } from './ChallengeManagerHeader'
import { mapChallengeToItem } from './lib/mappers.ts'

import { challengeService } from '~/shared/api/challenge.service'
import { PageLoader } from '~/shared/ui'
import { ChallengeListHeader } from '~/widget/ChallengeManager/ChallengeListHeader.tsx'
import { CloseEditingModeButton } from '~/widget/ChallengeManager/CloseEditingModeButton.tsx'
import { ListModeSwitcher } from '~/widget/ChallengeManager/ListModeSwitcher.tsx'
import { ShowActiveChallengesButton } from '~/widget/ChallengeManager/ShowActiveChallengesButton.tsx'
import { ShowArchiveChallengesButton } from '~/widget/ChallengeManager/ShowArchiveChallengesButton.tsx'

export const ChallengeManager = () => {
  const navigate = useNavigate()

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

  const activeListCanBeExtended = activeChallenges.length > 3

  const filteredActiveChallenges = useMemo(() => {
    return isExtendedList ? activeChallenges : activeChallenges.slice(0, 3)
  }, [activeChallenges, isExtendedList])

  const completedChallenges = useMemo(() => {
    return challenges.map((item) => mapChallengeToItem(item)).filter((item) => !item.isActive)
  }, [challenges])

  const completedListCanBeExtended = completedChallenges.length > 3

  const currentShownChallenges = isActiveChallengesShow
    ? filteredActiveChallenges
    : completedChallenges

  const listCanBeExtended = isActiveChallengesShow
    ? activeListCanBeExtended
    : completedListCanBeExtended

  if (query.isPending) {
    return <PageLoader />
  }

  return (
    <div className="flex-1 mt-[36px] px-[12px]">
      <ChallengeManagerHeader />

      <div className="flex flex-1 flex-col items-center">
        <ChallengeListHeader
          isActiveChallengesShow={isActiveChallengesShow}
          isRemoveMode={isRemoveMode}
          onEditIconClick={() => setIsRemoveMode(true)}
        />

        <div className={`flex flex-col gap-S mt-[24px]`}>
          <div
            className={`flex flex-col px-[16px] gap-S transition-all duration-300 ease-in-out ${isExtendedList ? 'overflow-y-scroll' : 'overflow-y-hidden'} ${isExtendedList ? 'h-[350px]' : 'h-[180px]'} ${isExtendedList ? 'custom-scrollbar custom-scrollbar-always' : ''}`}
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

          {listCanBeExtended && (
            <ListModeSwitcher
              onClick={() => setIsExtendedList((prev) => !prev)}
              isExtended={isExtendedList}
            />
          )}
        </div>

        {!isRemoveMode && isActiveChallengesShow && !isExtendedList && (
          <ShowArchiveChallengesButton onClick={() => setIsActiveChallengesShow(false)} />
        )}

        {!isRemoveMode && !isActiveChallengesShow && (
          <ShowActiveChallengesButton onClick={() => setIsActiveChallengesShow(true)} />
        )}

        {isRemoveMode && <CloseEditingModeButton onClick={() => setIsRemoveMode(false)} />}
      </div>
    </div>
  )
}
