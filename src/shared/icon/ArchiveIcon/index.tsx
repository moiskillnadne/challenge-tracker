type Props = {
  classNames?: string
}

export const ArchiveIcon = ({ classNames }: Props) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${classNames}`}
    >
      <g opacity="0.5" clipPath="url(#clip0_79_152)">
        <path
          d="M17.5 6.66667V17.5H2.50001V6.66667M8.33334 10H11.6667M0.833344 2.5H19.1667V6.66667H0.833344V2.5Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_79_152">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
