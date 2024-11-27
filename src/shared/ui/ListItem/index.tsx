import { ReactNode } from 'react'

import { Typography } from '~/shared/ui'

type Props = {
  label: string
  onClick: () => void

  isDanger?: boolean
  isDisabled?: boolean
  isActive?: boolean

  RightIcon?: ReactNode
}

export const ListItem = ({
  label,
  onClick,
  isDanger = false,
  isDisabled = false,
  isActive = false,
  RightIcon,
}: Props) => {
  const bgMap = new Map([
    [false, 'bg-pink25'],
    [true, 'bg-white'],
  ])

  const hoverEffectMap = new Map([
    [false, 'hover:bg-pink'],
    [true, 'hover:bg-white/50'],
  ])

  const textColorMap = new Map([
    [false, 'text-black'],
    [true, 'text-red'],
  ])

  const disabledMap = new Map([
    [true, 'opacity-50'],
    [false, ''],
  ])

  const handleClick = () => {
    if (isDisabled) {
      return
    }

    onClick()
  }

  return (
    <button
      type="button"
      className={`flex flex-shrink-0 w-[325px] h-[50px] px-[4px] py-[4px] items-center ${isActive ? 'bg-pink50' : bgMap.get(isDanger)} ${hoverEffectMap.get(isDanger)} rounded-3xl transition-all duration-300 ease-in-out relative cursor-pointer ${disabledMap.get(isDisabled)}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <div className="flex-1">
        <Typography
          text={label}
          classNames={`font-semibold text-M text-center cursor-pointer capitalize ${textColorMap.get(isDanger)}`}
        />
      </div>

      {RightIcon && <span className="w-[36px] h-[36px]">{RightIcon}</span>}
    </button>
  )
}
