import { useQuery } from '@tanstack/react-query'
import { accountService } from '../../shared/api/account.service'
import { UserInfoPanel } from './UserInfoPanel'
import { AccountHeader } from './AccountHeader'

export const AccountWidget = () => {
  const query = useQuery({
    queryKey: ['/protected/me'],
    queryFn: accountService.getAccountInfo,
    select(data) {
      return data.data.details
    },
  })

  return (
    <div className="flex flex-1 flex-col items-center pt-[32px] gap-[64px]">
      <AccountHeader />
      <UserInfoPanel isLoading={query.isPending} user={query.data?.user} />
    </div>
  )
}
