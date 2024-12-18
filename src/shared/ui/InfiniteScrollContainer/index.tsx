import { PropsWithChildren } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

type Props = PropsWithChildren<{
  dataLength: number
  hasMore: boolean
  loader: React.ReactNode
  next: () => void
}>

export const InfiniteScrollContainer = ({
  children,
  hasMore,
  loader,
  next,
  dataLength,
}: Props) => {
  return (
    <InfiniteScroll
      next={next}
      hasMore={hasMore}
      loader={loader}
      dataLength={dataLength}
    >
      {children}
    </InfiniteScroll>
  )
}
