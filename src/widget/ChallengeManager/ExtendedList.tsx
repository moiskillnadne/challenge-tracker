import { useNavigate } from 'react-router-dom'

import { InfiniteScrollContainer, PageLoader } from '~/shared/ui'
import { ChallengeGridItem } from '~/widget/ChallengeManager/ChallengeGridItem.tsx'
import { ChallengeItem } from '~/widget/ChallengeManager/lib/mappers.ts'

type Props = {
  isLoading: boolean
  list: Array<ChallengeItem>
  scrollParams: {
    dataLength: number
    hasMore: boolean
    fetchMore: () => void
  }

  onRemove: (id: string) => void
  isRemoveMode: boolean
  removingItemId: string | null
  isRemovingPending: boolean
}

export const ExtendedList = ({
  isLoading,
  scrollParams,
  list,
  onRemove,
  isRemovingPending,
  removingItemId,
  isRemoveMode,
}: Props) => {
  const navigate = useNavigate()

  const navigateToChallenge = (id: string) => {
    return navigate(`/challenges/${id}`)
  }

  if (isLoading) {
    return (
      <div
        className={`flex flex-col px-16 gap-S transition-all duration-300 ease-in-out overflow-y-hidden h-[350px] custom-scrollbar custom-scrollbar-always`}
      >
        <PageLoader />
      </div>
    )
  }

  return (
    <InfiniteScrollContainer
      scrollParentClassname="transition-all duration-300 ease-in-out h-[350px] px-16 custom-scrollbar custom-scrollbar-always"
      scrollChildClassname="flex flex-col gap-S"
      dataLength={scrollParams.dataLength}
      hasMore={scrollParams.hasMore}
      loader={
        <div className="w-100 flex justify-center py-6">
          <div className="w-[25px] h-[25px]">
            <div
              className={`w-full h-full rounded-full border-4 border-transparent animate-spin border-t-white`}
            />
          </div>
        </div>
      }
      next={scrollParams.fetchMore}
    >
      {list.map((item) => {
        const isInRemovingProcess = removingItemId === item.id

        return (
          <ChallengeGridItem
            key={item.id}
            goal={item.goal}
            onClick={() => navigateToChallenge(item.id)}
            isRemoveMode={isRemoveMode}
            onRemove={() => onRemove(item.id)}
            isLoading={isInRemovingProcess && isRemovingPending}
            isDisabled={isRemovingPending}
          />
        )
      })}
    </InfiniteScrollContainer>
  )
}
