import { Page, PageContent } from '../shared/ui';
import { Header } from '../widget/Header';
import { LoginWidget } from '../widget/Login';

export const LoginPage = () => {
  return (
    <Page>
      <Header navigationButtonShown={false} />

      <PageContent>
        <LoginWidget />
      </PageContent>
    </Page>
  );
};
