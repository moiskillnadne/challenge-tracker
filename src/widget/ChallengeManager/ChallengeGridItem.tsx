import { RightArrow } from '~/shared/icon'
import { Typography } from '~/shared/ui'

type Props = {
  goal: string
  onClick: () => void
}

export const ChallengeGridItem = ({ goal, onClick }: Props) => {
  return (
    <div
      className="flex items-center justify-center w-[325px] h-[50px] px-[4px] py-[4px] rounded-3xl bg-pink25 cursor-pointer relative hover:bg-pink transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      <div className="flex-1">
        <Typography
          text={goal}
          classNames="font-semibold text-[20px] cursor-default text-center cursor-pointer"
        />
      </div>

      <span className="w-[24px] h-[24px] cursor-pointer">
        <RightArrow />
      </span>
    </div>
  )
}
