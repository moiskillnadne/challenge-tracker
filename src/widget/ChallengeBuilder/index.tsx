import { useRef, useState } from 'react'

import { QueryClient, useMutation } from '@tanstack/react-query'
import { getDaysInMonth } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import { useCustomTranslation } from '~/feature/translation'
import { challengeService } from '~/shared/api/challenge.service'
import { Routes } from '~/shared/constants'
import { Typography } from '~/shared/ui'
import { convertDate } from '~/widget/Challenge/lib/convertDate'
import { ChallengeBuilderHeader } from '~/widget/ChallengeBuilder/ChallengeBuilderHeader.tsx'
import {
  ChallengeTypesMap,
  ChallengeTypeTranslations,
} from '~/widget/ChallengeBuilder/lib/constants.ts'

export const ChallengeBuilderWidget = () => {
  const { t } = useCustomTranslation()

  const ref = useRef(null)

  const [goal, setGoal] = useState<string>('')
  const [type, setType] = useState<string>('')

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: challengeService.createChallenge,
    onSuccess() {
      const queryClient = new QueryClient()

      queryClient.invalidateQueries({
        queryKey: ['/protected/challenge/'],
      })

      return navigate(Routes.HOME)
    },
  })

  const isTypeSelected = type.length > 0

  const isOtherType = type === 'OTHER'

  const isGoalExist = goal.length > 0

  const canBeCreated = isOtherType ? isGoalExist : isTypeSelected

  const onCreateClick = () => {
    if (!canBeCreated) {
      throw new Error(
        `[ChallengeBuilderWidget:onCreate] Goal length should be more than 1`,
      )
    }

    const now = new Date()

    const daysInMonth = getDaysInMonth(now)

    const startDate = convertDate(1)

    mutation.mutate({
      goal: type === 'OTHER' ? goal : type,
      description: 'N/A - Hardcoded on the client',
      startedAtDate: startDate,
      duration: daysInMonth,
      type,
      status: 'ACTIVE',
    })
  }

  return (
    <div className="flex-1 mt-36 px-12 pb-12 overflow-y-scroll">
      <ChallengeBuilderHeader />

      <div className="flex flex-col gap-M items-center">
        <Typography
          text={t('newChallenge')}
          classNames="uppercase font-black text-M text-pink"
        />

        <div className="text-center">
          <Typography
            text={t('createChallengeDescription.theChallenge')}
            classNames="text-M italic"
          />
          <Typography
            text={t('createChallengeDescription.willStartAtTheBeginning')}
            classNames="text-M italic font-bold"
          />
          <Typography
            text={t('createChallengeDescription.ofThisMonth')}
            classNames="text-M italic"
          />
        </div>

        <div className="text-center">
          <Typography
            text={t('createChallengeDescription.youCanMarkYourProgress')}
            classNames="text-M italic"
          />
          <Typography
            text={t('createChallengeDescription.eachDayUntilTheMonthEnds')}
            classNames="text-M italic"
          />
          <Typography
            text={t('createChallengeDescription.evenIfYouJoinedPartway')}
            classNames="text-M italic font-bold"
          />
          <Typography
            text={t('createChallengeDescription.through')}
            classNames="text-M italic font-bold"
          />
        </div>

        <div className="flex gap-M my-12 flex-wrap">
          {ChallengeTypeTranslations.map((challengeType) => (
            <button
              key={challengeType}
              onClick={() => setType(ChallengeTypesMap[challengeType])}
            >
              <Typography
                text={t(challengeType)}
                classNames={`text-pink hover:underline ${type === ChallengeTypesMap[challengeType] ? 'underline' : ''}`}
              />
            </button>
          ))}
        </div>

        <CSSTransition
          in={type === 'OTHER'}
          nodeRef={ref}
          timeout={1000}
          classNames="node-opacity"
          unmountOnExit
        >
          <div ref={ref} className="w-[350px] px-12 my-12">
            <input
              type="text"
              name="type"
              id="input-goal"
              placeholder="Goal"
              className="bg-transparent focus:outline-none duration-300 h-[40px] placeholder-black/50 border-b-2 border-black hover:border-white/20 focus:border-black/50 w-[300px]"
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
        </CSSTransition>

        <button
          className={`min-w-[100px] border duration-300 rounded-full border-black px-12 py-4 ${canBeCreated ? 'hover:opacity-75' : ''}  ${canBeCreated ? 'opacity-100' : 'opacity-50'}`}
          onClick={onCreateClick}
          disabled={!canBeCreated}
        >
          {mutation.isPending ? (
            <div className="mx-auto animate-spin h-[32px] w-[32px] border-[2px] rounded-full border-black/50 border-t-black"></div>
          ) : (
            <Typography
              text={t('start')}
              classNames="uppercase font-semibold italic text-M"
            />
          )}
        </button>
      </div>
    </div>
  )
}
