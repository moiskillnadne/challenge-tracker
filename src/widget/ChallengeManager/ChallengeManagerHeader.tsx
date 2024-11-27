import { useNavigate } from 'react-router-dom'

import { useAuthenticated } from '~/entity/user'
import { useLogoutMutation } from '~/feature/Logout'
import { useCustomTranslation } from '~/feature/translation'
import { Routes } from '~/shared/constants'
import { useToast } from '~/shared/hooks'
import { LogoutIcon, PlusIcon, SettingsIcon } from '~/shared/icon'
import { Typography } from '~/shared/ui'

export const ChallengeManagerHeader = () => {
  const { t } = useCustomTranslation()
  const navigate = useNavigate()
  const { showPromiseToast } = useToast()

  const { user } = useAuthenticated()

  const { mutateAsync: logout } = useLogoutMutation({
    onSuccess: () => navigate(Routes.LOGIN),
  })

  const onLogout = () => {
    showPromiseToast(logout(), {
      pending: t('logout.pending'),
      success: t('logout.success'),
      error: t('logout.error'),
    })
  }

  const onAddChallenge = () => {
    return navigate(Routes.CREATE_CHALLENGE)
  }

  const onSettings = () => {
    return navigate(Routes.SETTINGS)
  }

  return (
    <div className="w-full px-[24px] py-[12px] relative">
      <div
        id="challenge-manager-header-layer-1"
        className="flex items-start z-10 absolute top-0 left-0 w-full px-[24px] py-[12px] justify-between"
      >
        <button
          type="button"
          className="cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
          aria-label="logout"
          onClick={onLogout}
        >
          <div className="w-[29px] h-[29px]">
            <LogoutIcon classNames="stroke-black" />
          </div>
        </button>

        <div className="flex gap-M">
          <button
            type="button"
            className="cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
            aria-label="add challenge"
            onClick={onAddChallenge}
          >
            <div className="w-[32px] h-[32px]">
              <PlusIcon classNames="stroke-black" />
            </div>
          </button>
          <button
            type="button"
            className="cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
            aria-label="settings"
            onClick={onSettings}
          >
            <div className="w-[30px] h-[30px]">
              <SettingsIcon classNames="stroke-black" />
            </div>
          </button>
        </div>
      </div>

      <div id="challenge-manager-header-layer-2" className="flex relative top-0 left-0">
        <div className="flex-1">
          <div className="flex flex-col items-center">
            <div className="w-[100px]">
              <img
                className="w-[100px]"
                src="/web-app-manifest-512x512.png"
                alt="challengelogger-logo-pink"
              />
            </div>

            {user && (
              <div className="text-center mb-[16px] mt-[8px]">
                <Typography
                  text={t('profile')}
                  classNames="font-bold text-M uppercase cursor-default"
                />
                <Typography text={user.email} classNames="italic cursor-default" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
