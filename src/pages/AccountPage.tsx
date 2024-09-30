import { useQuery } from '@tanstack/react-query';
import { Page } from '../shared/ui';
import { accountService } from '../shared/api/account.service';

export const AccountPage = () => {
  const query = useQuery({ queryKey: ['/protected/me'], queryFn: accountService.getAccountInfo });

  return (
    <Page>
      {query.isLoading && <div className="text-white">Loading...</div>}

      {query.data?.data && <div className="text-white">Hello, ${query.data.data.email}</div>}
    </Page>
  );
};
