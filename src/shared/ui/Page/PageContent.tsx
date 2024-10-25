import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<unknown>;

export const PageContent = ({ children }: Props) => {
  return <div className="flex flex-1 overflow-hidden">{children}</div>;
};
