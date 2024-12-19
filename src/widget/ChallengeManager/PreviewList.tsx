import { useNavigate } from 'react-router-dom'

import { Routes } from '~/shared/constants'
import { PageLoader } from '~/shared/ui'
import { ChallengeGridItem } from '~/widget/ChallengeManager/ChallengeGridItem.tsx'
import { ChallengeItem } from '~/widget/ChallengeManager/lib/mappers.ts'

type Props = {
  isLoading: boolean
  list: Array<ChallengeItem>

  onRemove: (id: string) => void
  isRemoveMode: boolean
  removingItemId: string | null
  isRemovingPending: boolean
}

export const PreviewList = ({
  isLoading,
  list,
  removingItemId,
  isRemoveMode,
  isRemovingPending,
  onRemove,
}: Props) => {
  const navigate = useNavigate()

  const navigateToChallenge = (id: string, type: string) => {
    return navigate(Routes.CHALLENGE.navigateTo(id, type))
  }

  if (isLoading) {
    return (
      <div
        className={`flex flex-col px-16 gap-S transition-all duration-300 ease-in-out overflow-y-hidden h-[180px]`}
      >
        <PageLoader />
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col px-16 gap-S transition-all duration-300 ease-in-out overflow-y-hidden h-[180px]`}
    >
      {list.map((item) => {
        const isInRemovingProcess = removingItemId === item.id

        return (
          <ChallengeGridItem
            key={item.id}
            goal={item.goal}
            onClick={() => navigateToChallenge(item.id, item.type)}
            isRemoveMode={isRemoveMode}
            onRemove={() => onRemove(item.id)}
            isLoading={isInRemovingProcess && isRemovingPending}
            isDisabled={isRemovingPending}
          />
        )
      })}
    </div>
  )
}
