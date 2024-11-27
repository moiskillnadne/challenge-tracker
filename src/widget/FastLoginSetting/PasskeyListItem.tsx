import { RemoveIcon } from '~/shared/icon'
import { Typography } from '~/shared/ui'
import { Loader } from '~/shared/ui/Loader'

type Props = {
  label: string

  onRemove: () => void

  isRemoveMode: boolean
  isDisabled: boolean
  isLoading: boolean
}

export const PasskeyListItem = ({
  label,
  isRemoveMode,
  onRemove,
  isDisabled,
  isLoading,
}: Props) => {
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
      className={`flex flex-shrink-0 w-[325px] h-[50px] px-[4px] py-[4px] bg-pink25 rounded-3xl transition-all duration-300 ease-in-out relative ${cursorModeMap.get(isRemoveMode)} ${hoverEffectMap.get(isRemoveMode)} ${disabledMap.get(isDisabled)}`}
    >
      <div className={`flex-1 flex items-center justify-center`}>
        <div className="flex-1">
          <Typography
            text={label}
            classNames={`font-semibold text-M ${cursorModeMap.get(isRemoveMode)} text-center`}
          />
        </div>

        {isLoading && (
          <span className="w-[36px] h-[36px]">
            <Loader />
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
    </div>
  )
}
