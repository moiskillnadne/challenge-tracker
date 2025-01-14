import { useCallback } from 'react'

import { useNavigate } from 'react-router-dom'

import { useLogoutMutation } from '~/feature/Logout'
import { useCustomTranslation } from '~/feature/translation'
import { Routes } from '~/shared/constants'
import { useToast } from '~/shared/hooks'
import { SettingItem } from '~/widget/SettingList/SettingItem.tsx'

export const SettingList = () => {
  const { t } = useCustomTranslation()
  const navigate = useNavigate()
  const { showPromiseToast } = useToast()

  const { mutateAsync: logout, isPending } = useLogoutMutation({
    onSuccess: () => navigate(Routes.LOGIN),
  })

  const onLogout = useCallback(async () => {
    return showPromiseToast(logout(), {
      pending: t('logout.pending'),
      success: t('logout.success'),
      error: t('logout.error'),
    })
  }, [logout, showPromiseToast, t])

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col items-center gap-3">
        <SettingItem
          label={t('language')}
          onClick={() => navigate(Routes.SETTINGS_LANGUAGE)}
          isDisabled={isPending}
        />
        <SettingItem
          label={t('fastLogin')}
          onClick={() => navigate(Routes.SETTINGS_FAST_LOGIN)}
          isDisabled={isPending}
        />
        <SettingItem
          label={t('experimentalFeatures')}
          onClick={() => navigate(Routes.SETTINGS_EXPERIMENTAL_FEATURES)}
          isDisabled={isPending}
        />
        <SettingItem
          label={t('logout.title')}
          onClick={onLogout}
          isDanger={true}
          isDisabled={isPending}
        />
      </div>
    </div>
  )
}
