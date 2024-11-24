type Props = {
  classNames?: string
}

export const BackArrowIcon = ({ classNames }: Props) => {
  return (
    <svg
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${classNames}`}
    >
      <path
        d="M9.45521 15.7085L16.2219 22.4752L14.5 24.1668L4.83334 14.5002L14.5 4.8335L16.2219 6.52516L9.45521 13.2918H24.1667V15.7085H9.45521Z"
        fill="#1D1B20"
      />
    </svg>
  )
}
