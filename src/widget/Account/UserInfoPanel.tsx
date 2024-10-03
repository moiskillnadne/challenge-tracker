import { UserDTO } from '../../shared/api/account.service';

type Props = {
  isLoading: boolean;

  user?: UserDTO;
};

export const UserInfoPanel = (props: Props) => {
  if (props.isLoading) {
    return (
      <div className="w-[50px] h-[50px] m-[8px] rounded-full border-[4px] border-transparent border-t-white animate-spin" />
    );
  }

  return <div className="text-white">Hello, {props.user?.email}</div>;
};
