import { Typography } from '~/shared/ui'

type Props = {
  label: string
  onClick: () => void
}

export const CounterListItem = ({ label, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-shrink-0 w-[325px] h-[50px] px-[4px] py-[4px] bg-pink25 rounded-3xl transition-all duration-300 ease-in-out relative hover:bg-pink cursor-pointer`}
    >
      <div className={`flex-1 flex items-center justify-center`}>
        <div className="flex-1">
          <Typography
            text={label}
            classNames={`font-semibold text-M text-center`}
          />
        </div>
      </div>
    </div>
  )
}
