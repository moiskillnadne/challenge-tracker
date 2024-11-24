import { ListItem } from '~/shared/ui'

type Props = {
  label: string
  onClick: () => void

  isDanger?: boolean
  isDisabled?: boolean
}

export const SettingItem = ({ label, onClick, isDanger = false, isDisabled = false }: Props) => {
  return <ListItem label={label} onClick={onClick} isDanger={isDanger} isDisabled={isDisabled} />
}
