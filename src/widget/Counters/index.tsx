import { useNavigate } from 'react-router-dom'

import { useCustomTranslation } from '~/feature/translation'
import { Routes } from '~/shared/constants'
import { PlusIcon } from '~/shared/icon'
import { PageLoader, Typography } from '~/shared/ui'
import { CounterListItem } from '~/widget/Counters/CounterListItem.tsx'
import { useCountersQuery } from '~/widget/Counters/lib/useCountersQuery.ts'

export const Counters = () => {
  const { t } = useCustomTranslation()
  const navigate = useNavigate()

  const counterQuery = useCountersQuery()

  const counters = counterQuery.data?.data.details.data ?? []

  if (counterQuery.isPending) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(Routes.COUNTERS_CREATE)}
          className={`flex flex-1 w-[225px] h-[50px] px-4 py-4 items-center justify-center gap-S bg-violet20 hover:bg-violet50  rounded-3xl transition-all duration-300 ease-in-out relative cursor-pointer`}
        >
          <span className="h-[28px] w-[28px]">
            <PlusIcon classNames="stroke-pink" />
          </span>
          <Typography
            text={t('createCounter')}
            classNames="font-semibold text-M italic"
          />
        </button>

        <div className="flex flex-1 flex-col items-center mt-16">
          <Typography
            text={t('yourCounters')}
            classNames="font-semibold text-M italic text-center"
          />

          <div className="flex flex-1 flex-col justify-center mt-24">
            {counters.length === 0 && (
              <Typography
                text={t('noDevicesYet')}
                classNames="font-semibold text-S italic text-black/50 mt-32"
              />
            )}

            <div className="flex flex-col px-16 gap-S h-[350px] transition-all duration-300 ease-in-out overflow-y-scroll custom-scrollbar custom-scrollbar-always">
              {counters?.length > 0 &&
                counters.map((el) => {
                  return (
                    <CounterListItem
                      key={el.id}
                      label={el.name}
                      onClick={() => {
                        return navigate(Routes.COUNTER.navigateTo(el.id))
                      }}
                    />
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
