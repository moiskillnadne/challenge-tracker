import { Page } from '../shared/ui';
import { AccountWidget } from '../widget/Account';
import { Header } from '../widget/Header';

export const AccountPage = () => {
  return (
    <Page>
      <Header />
      <AccountWidget />
    </Page>
  );
};
