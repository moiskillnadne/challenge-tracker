import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<unknown>

export const Page = ({ children }: Props) => {
  return (
    <div id="page-component" className="w-screen h-dvh bg-white">
      <div className="h-full w-full flex flex-col overflow-hidden">{children}</div>
    </div>
  )
}
