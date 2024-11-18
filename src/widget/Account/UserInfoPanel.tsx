import { LogoutButton } from '~/feature/Logout'
import { RegisterPasskeys } from '~/feature/RegisterPasskeys'
import { UserDTO } from '~/shared/api/account.service'
import { PageLoader } from '~/shared/ui'

type Props = {
  isLoading: boolean

  user?: UserDTO
}

export const UserInfoPanel = (props: Props) => {
  if (props.isLoading) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col items-center gap-[8px]">
      <div className="">Hello, {props.user?.email}</div>

      <div className="my-[12px]">
        <RegisterPasskeys />
      </div>

      <LogoutButton />
    </div>
  )
}
