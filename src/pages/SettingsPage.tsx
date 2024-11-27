import { Outlet, useNavigate } from 'react-router-dom'

import { useCustomTranslation } from '~/feature/translation'
import { BackArrowIcon } from '~/shared/icon'
import { Page, PageContent, Typography } from '~/shared/ui'
import { AppVersion } from '~/widget/AppVersion'

export const SettingsPage = () => {
  const { t } = useCustomTranslation()
  const navigate = useNavigate()

  const goBack = () => {
    return navigate(-1)
  }

  return (
    <Page>
      <div className="flex-1 mt-36 px-12">
        <div className="w-full px-24 py-12 relative">
          <div
            id="challenge-manager-header-layer-1"
            className="flex items-start z-10 absolute top-0 left-0 w-full px-24 py-12 justify-between"
          >
            <button
              type="button"
              className="cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
              aria-label="back-button"
              onClick={goBack}
            >
              <div className="w-[29px] h-[29px]">
                <BackArrowIcon />
              </div>
            </button>
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

                <div className="text-center mb-16 mt-8">
                  <Typography
                    text={t('settings')}
                    classNames="font-bold text-M uppercase cursor-default"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <PageContent>
          <Outlet />
          <AppVersion />
        </PageContent>
      </div>
    </Page>
  )
}
