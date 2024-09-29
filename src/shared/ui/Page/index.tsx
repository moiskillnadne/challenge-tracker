import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<unknown>;

const Page = ({ children }: Props) => {
  return <div className="w-screen h-screen bg-black">{children}</div>;
};

export default Page;
