type Props = {
  color?: string
  classNames?: string
}

export const PlusIcon = ({ color, classNames }: Props) => {
  return (
    <svg
      className={`w-full h-full ${classNames}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 5V19" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
