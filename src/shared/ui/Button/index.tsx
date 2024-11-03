import { Typography } from '../Typography'

type Props = {
  label: string
  onClick: () => void
  isLoading?: boolean
  isDisabled?: boolean
  classNames?: string
}

export const Button = ({ label, onClick, isDisabled, isLoading, classNames }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`border-[1px] rounded-full h-full w-full flex justify-center items-center ${classNames}`}
    >
      {isLoading ? (
        <div className="animate-spin h-[25px] w-[25px] border-[2px] rounded-full border-black/50 border-t-black"></div>
      ) : (
        <Typography text={label} />
      )}
    </button>
  )
}
