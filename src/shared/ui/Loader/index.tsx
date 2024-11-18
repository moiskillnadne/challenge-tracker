type Props = {
  borderWidth?: 'sm' | 'md' | 'lg'
}

export const Loader = ({ borderWidth }: Props) => {
  const borderWidthMap = new Map([
    ['sm', 'border-2'],
    ['md', 'border-4'],
    ['lg', 'border-8'],
  ])

  return (
    <div
      className={`w-full h-full rounded-full ${borderWidthMap.get(borderWidth ?? 'md')} border-transparent animate-spin border-t-white`}
    />
  )
}
