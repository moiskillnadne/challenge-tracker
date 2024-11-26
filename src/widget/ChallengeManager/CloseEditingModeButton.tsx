import { useCustomTranslation } from '~/feature/translation'
import { Button, Typography } from '~/shared/ui'

type Props = {
  onClick: () => void
}

export const CloseEditingModeButton = ({ onClick }: Props) => {
  const { t } = useCustomTranslation()

  return (
    <div>
      <Button
        onClick={onClick}
        classNames="mt-[24px] py-[8px] px-[16px] border-black uppercase text-[20px] font-semibold transition-all duration-300 ease-in-out hover:bg-black/10"
      >
        <Typography text={t('done')} />
      </Button>
    </div>
  )
}
