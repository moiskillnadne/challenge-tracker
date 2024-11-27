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
        classNames="mt-24 py-8 px-16 border-black uppercase text-M font-semibold transition-all duration-300 ease-in-out hover:bg-black/10"
      >
        <Typography text={t('done')} />
      </Button>
    </div>
  )
}
