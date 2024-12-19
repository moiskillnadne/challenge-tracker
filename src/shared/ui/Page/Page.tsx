import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  bgBackground?: string
}>

export const Page = ({ children, bgBackground }: Props) => {
  return (
    <div
      id="page-component"
      className={`w-screen h-dvh ${bgBackground ? bgBackground : 'bg-background'}`}
    >
      <div className="h-full w-full flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  )
}
