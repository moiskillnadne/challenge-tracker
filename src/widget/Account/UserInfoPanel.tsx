import { LogoutButton } from '../../feature/Logout';
import { RegisterPasskeys } from '../../feature/RegisterPasskeys/RegisterPasskeys';
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

  return (
    <div className="flex flex-col items-center gap-[8px]">
      <div className="">Hello, {props.user?.email}</div>

      <div className="my-[12px]">
        <RegisterPasskeys />
      </div>

      <LogoutButton />
    </div>
  );
};
