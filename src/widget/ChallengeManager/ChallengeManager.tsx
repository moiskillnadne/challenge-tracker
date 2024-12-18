import { useMemo, useState } from 'react'

import { ChallengeManagerHeader } from './ChallengeManagerHeader'
import { mapChallengeToItem } from './lib/mappers.ts'

import { PageLoader } from '~/shared/ui'
import { ChallengeListHeader } from '~/widget/ChallengeManager/ChallengeListHeader.tsx'
import { CloseEditingModeButton } from '~/widget/ChallengeManager/CloseEditingModeButton.tsx'
import { ExtendedList } from '~/widget/ChallengeManager/ExtendedList.tsx'
import { getFirst } from '~/widget/ChallengeManager/lib/getFirst.ts'
import { useChallengeListQuery } from '~/widget/ChallengeManager/lib/hooks/useChallengeListQuery.ts'
import { useRemoveChallengeMutation } from '~/widget/ChallengeManager/lib/hooks/useRemoveChallengeMutation.ts'
import { ListModeSwitcher } from '~/widget/ChallengeManager/ListModeSwitcher.tsx'
import { PreviewList } from '~/widget/ChallengeManager/PreviewList.tsx'
import { ShowActiveChallengesButton } from '~/widget/ChallengeManager/ShowActiveChallengesButton.tsx'
import { ShowArchiveChallengesButton } from '~/widget/ChallengeManager/ShowArchiveChallengesButton.tsx'

export const ChallengeManager = () => {
  const [isRemoveMode, setIsRemoveMode] = useState<boolean>(false)
  const [isExtendedList, setIsExtendedList] = useState<boolean>(false)

  const [status, setStatus] = useState<'ACTIVE' | 'COMPLETED'>('ACTIVE')

  const query = useChallengeListQuery({
    status: status,
  })

  const removeChallengeMutation = useRemoveChallengeMutation({
    onSuccess: () => {
      query.manager.refetch()
    },
  })

  const challenges = useMemo(() => {
    if (query?.challengeList) {
      return query.challengeList.map(mapChallengeToItem)
    }

    return []
  }, [query?.challengeList])

  const listCanBeExtended = challenges?.length > 3

  return (
    <div className="flex-1 mt-36 px-12">
      <ChallengeManagerHeader />

      <div className="flex flex-1 flex-col items-center">
        <ChallengeListHeader
          isActiveChallengesShow={status === 'ACTIVE'}
          isRemoveMode={isRemoveMode}
          onEditIconClick={() => setIsRemoveMode(true)}
        />

        <div className={`flex flex-col gap-S mt-24`}>
          {!isExtendedList && (
            <PreviewList
              isLoading={query.isLoading}
              list={getFirst(3, challenges)}
              onRemove={removeChallengeMutation.manager.mutate}
              isRemoveMode={isRemoveMode}
              removingItemId={removeChallengeMutation.manager.variables ?? null}
              isRemovingPending={removeChallengeMutation.isLoading}
            />
          )}

          {isExtendedList && (
            <ExtendedList
              scrollParams={{
                dataLength: challenges.length,
                hasMore: !!query?.pagination?.nextPage,
                fetchMore: () => {
                  console.log('Fetching next page')
                  query.fetchNextPage()
                },
              }}
              isLoading={query.isLoading}
              list={challenges}
              onRemove={removeChallengeMutation.manager.mutate}
              isRemoveMode={isRemoveMode}
              removingItemId={removeChallengeMutation.manager.variables ?? null}
              isRemovingPending={removeChallengeMutation.isLoading}
            />
          )}

          {listCanBeExtended && (
            <ListModeSwitcher
              onClick={() => setIsExtendedList((prev) => !prev)}
              isExtended={isExtendedList}
            />
          )}
        </div>

        {!isRemoveMode && status === 'ACTIVE' && !isExtendedList && (
          <ShowArchiveChallengesButton onClick={() => setStatus('COMPLETED')} />
        )}

        {!isRemoveMode && status === 'COMPLETED' && (
          <ShowActiveChallengesButton onClick={() => setStatus('ACTIVE')} />
        )}

        {isRemoveMode && (
          <CloseEditingModeButton onClick={() => setIsRemoveMode(false)} />
        )}
      </div>
    </div>
  )
}
