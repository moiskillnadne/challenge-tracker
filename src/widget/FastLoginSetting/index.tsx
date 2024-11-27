import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useCustomTranslation } from '~/feature/translation'
import { Routes } from '~/shared/constants'
import { EditIcon, PlusIcon } from '~/shared/icon'
import { PageLoader, Typography } from '~/shared/ui'
import { CloseEditingModeButton } from '~/widget/ChallengeManager/CloseEditingModeButton.tsx'
import { usePasskeyRemoveMutation } from '~/widget/FastLoginSetting/lib/usePasskeyRemoveMutation.ts'
import { usePasskeysQuery } from '~/widget/FastLoginSetting/lib/usePasskeysQuery.ts'
import { PasskeyListItem } from '~/widget/FastLoginSetting/PasskeyListItem.tsx'

export const FastLoginSetting = () => {
  const { t } = useCustomTranslation()
  const navigate = useNavigate()

  const [isRemoveMode, setIsRemoveMode] = useState<boolean>(false)

  const passkeyQuery = usePasskeysQuery()

  const passkeyRemoveMutation = usePasskeyRemoveMutation({
    onSuccess: () => {
      passkeyQuery.refetch()
    },
  })

  const devices = passkeyQuery.data?.data ?? []

  if (passkeyQuery.isPending) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(Routes.SETTINGS_FAST_LOGIN_CREATE)}
          className={`flex flex-1 w-[225px] h-[50px] px-4 py-4 items-center justify-center gap-S bg-violet20 hover:bg-violet50  rounded-3xl transition-all duration-300 ease-in-out relative cursor-pointer`}
        >
          <span className="h-[28px] w-[28px]">
            <PlusIcon classNames="stroke-pink" />
          </span>
          <Typography text={t('addFastLogin')} classNames="font-semibold text-M italic" />
        </button>

        <div className="flex flex-1 flex-col items-center mt-16">
          <div className="flex gap-L">
            <div className="flex flex-1">
              <Typography
                text={t('yourDevices')}
                classNames="font-semibold text-M italic text-center"
              />
            </div>

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

          <div className="flex flex-1 flex-col justify-center mt-24">
            {devices.length === 0 && (
              <Typography
                text={t('noDevicesYet')}
                classNames="font-semibold text-S italic text-black/50 mt-32"
              />
            )}

            <div className="flex flex-col px-16 gap-S h-[350px] transition-all duration-300 ease-in-out overflow-y-scroll custom-scrollbar custom-scrollbar-always">
              {devices.length > 0 &&
                devices.map((device) => {
                  const name = device.deviceName ?? 'N/A'

                  const isLoading = passkeyRemoveMutation.variables === device.id

                  return (
                    <PasskeyListItem
                      key={device.id}
                      label={name}
                      onRemove={() => passkeyRemoveMutation.mutate(device.id)}
                      isRemoveMode={isRemoveMode}
                      isDisabled={passkeyRemoveMutation.isPending}
                      isLoading={isLoading}
                    />
                  )
                })}
            </div>
          </div>

          {isRemoveMode && (
            <div className="w-[200px]">
              <CloseEditingModeButton onClick={() => setIsRemoveMode(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
