import { useCustomTranslation } from '../feature/translation';
import { Routes } from '../shared/constants';
import { Page } from '../shared/ui';
import { Header } from '../widget/Header';

export const HomePage = () => {
  const { t } = useCustomTranslation();

  return (
    <Page>
      <Header
        navigationButtonShown={true}
        navigateTo={Routes.ACCOUNT}
        labelNavigationButton={t('account')}
      />

      <h1>Home Page</h1>
      <p>Home page content</p>
    </Page>
  );
};
