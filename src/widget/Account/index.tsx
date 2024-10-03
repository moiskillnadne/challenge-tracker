import { useQuery } from '@tanstack/react-query';
import { accountService } from '../../shared/api/account.service';
import { UserInfoPanel } from './UserInfoPanel';
import { ChallengeManager } from './ChallengeManager';

export const AccountWidget = () => {
  const query = useQuery({
    queryKey: ['/protected/me'],
    queryFn: accountService.getAccountInfo,
    select(data) {
      return data.data.details;
    },
  });

  return (
    <div className="flex flex-col items-center pt-[32px] gap-[64px]">
      <UserInfoPanel isLoading={query.isPending} user={query.data?.user} />

      <ChallengeManager />
    </div>
  );
};
