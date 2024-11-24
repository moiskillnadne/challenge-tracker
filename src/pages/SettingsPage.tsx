import { Outlet } from 'react-router-dom'

import { useCustomTranslation } from '~/feature/translation'
import { Page, PageContent, Typography } from '~/shared/ui'
import { AppVersion } from '~/widget/AppVersion'

export const SettingsPage = () => {
  const { t } = useCustomTranslation()

  return (
    <Page>
      <div className="w-full px-[24px] py-[12px] relative">
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

              <div className="text-center mb-[16px] mt-[8px]">
                <Typography
                  text={t('settings')}
                  classNames="font-bold text-[20px] uppercase cursor-default"
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
    </Page>
  )
}
