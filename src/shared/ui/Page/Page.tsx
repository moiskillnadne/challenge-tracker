import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<unknown>

export const Page = ({ children }: Props) => {
  return (
    <div id="page-component" className="w-screen h-dvh bg-background">
      <div className="h-full w-full flex flex-col overflow-hidden">
        <div>{children}</div>
      </div>
    </div>
  )
}
