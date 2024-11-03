import { ForwardedRef, forwardRef } from 'react'

import { useCustomTranslation } from '~/feature/translation'
import { Button } from '~/shared/ui'

type Props = {
  labelKey: string
  onClick: () => void
  isLoading?: boolean
  isDisabled?: boolean
  classNames?: string
}

export const LoginButton = forwardRef(
  (
    { onClick, isLoading, labelKey, isDisabled, classNames }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { t } = useCustomTranslation()

    return (
      <div ref={ref} className="w-[300px] h-[45px]">
        <Button
          label={t(labelKey)}
          onClick={onClick}
          isLoading={isLoading}
          isDisabled={isDisabled}
          classNames={classNames}
        />
      </div>
    )
  },
)

LoginButton.displayName = 'LoginButton'
