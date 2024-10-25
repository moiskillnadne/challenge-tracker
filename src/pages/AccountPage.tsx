import { useCustomTranslation } from '../feature/translation';
import { Routes } from '../shared/constants';
import { Page, PageContent } from '../shared/ui';
import { AccountWidget } from '../widget/Account';
import { AppVersion } from '../widget/AppVersion';
import { Header } from '../widget/Header';

export const AccountPage = () => {
  const { t } = useCustomTranslation();

  return (
    <Page>
      <Header
        navigationButtonShown={true}
        navigateTo={Routes.HOME}
        labelNavigationButton={t('home')}
      />

      <PageContent>
        <AccountWidget />

        <AppVersion />
      </PageContent>
    </Page>
  );
};
