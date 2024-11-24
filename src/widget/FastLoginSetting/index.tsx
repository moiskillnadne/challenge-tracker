import { useCustomTranslation } from '~/feature/translation'
import { PlusIcon } from '~/shared/icon'
import { Typography } from '~/shared/ui'

export const FastLoginSetting = () => {
  const { t } = useCustomTranslation()

  const devices = []

  const isDeviceListEmpty = devices.length === 0

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col items-center gap-3">
        <button
          type="button"
          className={`flex flex-1 w-[225px] h-[50px] px-[4px] py-[4px] items-center justify-center gap-[8px] bg-violet20 hover:bg-violet50  rounded-3xl transition-all duration-300 ease-in-out relative cursor-pointer`}
        >
          <span className="h-[28px] w-[28px]">
            <PlusIcon classNames="stroke-pink" />
          </span>
          <Typography text={t('addFastLogin')} classNames="font-semibold text-[20px] italic" />
        </button>

        <div className="mt-[16px]">
          <Typography text={t('yourDevices')} classNames="font-semibold text-[20px] italic" />

          <div className="flex flex-1 justify-center">
            {isDeviceListEmpty && (
              <Typography
                text={t('noDevicesYet')}
                classNames="font-semibold text-[14px] italic text-black/50 mt-[32px]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
