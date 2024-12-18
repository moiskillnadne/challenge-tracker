import { useNavigate } from 'react-router-dom'

import { ChallengeGridItem } from '~/widget/ChallengeManager/ChallengeGridItem.tsx'
import { ChallengeItem } from '~/widget/ChallengeManager/lib/mappers.ts'

type Props = {
  list: Array<ChallengeItem>

  onRemove: (id: string) => void
  isRemoveMode: boolean
  removingItemId: string | null
  isRemovingPending: boolean
}

export const PreviewList = ({
  list,
  removingItemId,
  isRemoveMode,
  isRemovingPending,
  onRemove,
}: Props) => {
  const navigate = useNavigate()

  const navigateToChallenge = (id: string) => {
    return navigate(`/challenges/${id}`)
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
            onClick={() => navigateToChallenge(item.id)}
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
