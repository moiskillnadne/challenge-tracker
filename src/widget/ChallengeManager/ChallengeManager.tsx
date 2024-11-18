import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { ChallengeGridItem } from './ChallengeGridItem'
import { ChallengeManagerHeader } from './ChallengeManagerHeader'

import { useCustomTranslation } from '~/feature/translation'
import { challengeService } from '~/shared/api/challenge.service'
import { Loader } from '~/shared/ui/Loader'
import { mapChallengeToItem } from '~/widget/Account/lib/mappers'

export const ChallengeManager = () => {
  const navigate = useNavigate()
  const { t } = useCustomTranslation()

  const query = useQuery({
    queryKey: ['/protected/challenge/'],
    queryFn: challengeService.getChallengeList,
    select: (data) => data.data.details,
  })

  const challenges = query.data?.challenges

  if (query.isPending) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Loader />;
      </div>
    )
  }

  return (
    <div className="flex-1 mt-[36px] px-[12px]">
      <ChallengeManagerHeader />

      <div className="w-full flex flex-col items-center">
        <Typography
          text={t('currentChallenges')}
          classNames="text-center font-semibold text-[20px] italic cursor-default"
        />

        <div className="flex flex-col gap-[8px] mt-[24px]">
          {challenges &&
            challenges
              .map((item) => mapChallengeToItem(item))
              .map((item) => (
                <ChallengeGridItem
                  key={item.id}
                  goal={item.goal}
                  onClick={() => {
                    return navigate(`/challenge/${item.id}`)
                  }}
                />
              ))}
        </div>
      </div>
    </div>
  )
}
