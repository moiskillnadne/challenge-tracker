export type Props = {
  classNames?: string
}

export const RemoveIcon = ({ classNames }: Props) => {
  return (
    <svg
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${classNames}`}
    >
      <rect x="0.5" y="0.5" width="28" height="28" rx="14" fill="#FF2B6B" stroke="#F1EBF5" />
      <line x1="8" y1="15" x2="21" y2="15" stroke="#F1EBF5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
