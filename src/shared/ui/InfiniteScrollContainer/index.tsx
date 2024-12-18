import { PropsWithChildren } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

type Props = PropsWithChildren<{
  dataLength: number
  hasMore: boolean
  loader: React.ReactNode
  next: () => void
  scrollParentClassname?: string
  scrollChildClassname?: string
}>

export const InfiniteScrollContainer = ({
  children,
  hasMore,
  loader,
  next,
  dataLength,
  scrollParentClassname,
  scrollChildClassname,
}: Props) => {
  return (
    <div id="scrollableDiv" className={scrollParentClassname}>
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        next={next}
        hasMore={hasMore}
        loader={loader}
        dataLength={dataLength}
        className={scrollChildClassname}
      >
        {children}
      </InfiniteScroll>
    </div>
  )
}
