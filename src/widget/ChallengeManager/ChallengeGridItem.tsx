import { RemoveIcon, RightArrow } from '~/shared/icon'
import { Typography } from '~/shared/ui'

type Props = {
  goal: string
  onClick: () => void

  isRemoveMode: boolean
  onRemove: () => void
}

export const ChallengeGridItem = ({ goal, onClick, isRemoveMode, onRemove }: Props) => {
  const handleClick = () => {
    if (!isRemoveMode) {
      onClick()
    }
  }

  const hoverEffectMap = new Map([
    [true, ''],
    [false, 'hover:bg-pink'],
  ])

  const cursorModeMap = new Map([
    [true, 'cursor-default'],
    [false, 'cursor-pointer'],
  ])

  return (
    <div
      className={`flex items-center justify-center w-[325px] h-[50px] px-[4px] py-[4px] rounded-3xl bg-pink25 ${cursorModeMap.get(isRemoveMode)} relative ${hoverEffectMap.get(isRemoveMode)} transition-all duration-300 ease-in-out`}
      onClick={handleClick}
    >
      <div className="flex-1">
        <Typography
          text={goal}
          classNames={`font-semibold text-[20px] ${cursorModeMap.get(isRemoveMode)} text-center`}
        />
      </div>
      {!isRemoveMode && (
        <span className="w-[24px] h-[24px] cursor-pointer">
          <RightArrow />
        </span>
      )}

      {isRemoveMode && (
        <button
          type="button"
          className="w-[36px] h-[36px] cursor-pointer animate-[shakes_1s_ease-in-out_infinite]"
          onClick={onRemove}
        >
          <RemoveIcon />
        </button>
      )}
    </div>
  )
}
