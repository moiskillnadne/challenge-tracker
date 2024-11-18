import { RemoveIcon, RightArrow } from '~/shared/icon'
import { Typography } from '~/shared/ui'
import { Loader } from '~/shared/ui/Loader'

type Props = {
  goal: string
  onClick: () => void

  onRemove: () => void

  isRemoveMode: boolean
  isDisabled: boolean
  isLoading: boolean
}

export const ChallengeGridItem = ({
  goal,
  onClick,
  isRemoveMode,
  onRemove,
  isDisabled,
  isLoading,
}: Props) => {
  const handleClick = () => {
    if (isDisabled) {
      return
    }

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

  const disabledMap = new Map([
    [true, 'opacity-50'],
    [false, ''],
  ])

  const removeIconAnimationMap = new Map([
    [true, 'animate-[shakes_1s_ease-in-out_infinite]'],
    [false, ''],
  ])

  return (
    <div
      className={`flex items-center justify-center w-[325px] h-[50px] px-[4px] py-[4px] rounded-3xl bg-pink25 ${cursorModeMap.get(isRemoveMode)} relative ${hoverEffectMap.get(isRemoveMode)} transition-all duration-300 ease-in-out ${disabledMap.get(isDisabled)}`}
      onClick={handleClick}
    >
      <div className="flex-1">
        <Typography
          text={goal}
          classNames={`font-semibold text-[20px] ${cursorModeMap.get(isRemoveMode)} text-center`}
        />
      </div>

      {isLoading && (
        <span className="w-[36px] h-[36px]">
          <Loader />
        </span>
      )}

      {!isRemoveMode && !isLoading && (
        <span className="w-[24px] h-[24px] cursor-pointer">
          <RightArrow />
        </span>
      )}

      {isRemoveMode && !isLoading && (
        <button
          type="button"
          className={`w-[36px] h-[36px] cursor-pointer ${removeIconAnimationMap.get(!isDisabled)}`}
          onClick={onRemove}
          disabled={isDisabled}
        >
          <RemoveIcon classNames="stroke-pink" />
        </button>
      )}
    </div>
  )
}
