import { useNavigate } from 'react-router-dom'

import { useCustomTranslation } from '~/feature/translation'
import { Routes } from '~/shared/constants'
import { SettingItem } from '~/widget/SettingList/SettingItem.tsx'

export const ExperimentalFeatures = () => {
  const { t } = useCustomTranslation()
  const navigate = useNavigate()

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col items-center gap-3">
        <SettingItem
          label={t('counters')}
          onClick={() => navigate(Routes.COUNTERS)}
          isDisabled={false}
        />
      </div>
    </div>
  )
}
