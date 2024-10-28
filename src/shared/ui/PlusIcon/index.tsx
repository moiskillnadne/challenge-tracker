type Props = {
  color?: string
}

export const PlusIcon = ({ color }: Props) => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 5V19" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
