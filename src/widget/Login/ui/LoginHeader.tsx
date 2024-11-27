import { useCustomTranslation } from '~/feature/translation'
import { Typography } from '~/shared/ui'

export const LoginHeader = () => {
  const { t } = useCustomTranslation()

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="w-full px-[16px] flex flex-col items-center">
        <div className="w-[250px] py-[14px] px-[24px]">
          <img className="w-[250px]" src="/web-app-manifest-512x512.png" alt="" />
        </div>
        <Typography classNames="font-bold text-XXL whitespace-pre-wrap text-center text-black">
          {t('welcomeToChallengeLogger')}
        </Typography>
      </div>
    </div>
  )
}
