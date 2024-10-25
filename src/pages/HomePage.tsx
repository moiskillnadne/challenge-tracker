import { useCustomTranslation } from '../feature/translation';
import { Routes } from '../shared/constants';
import { Page } from '../shared/ui';
import { ChallengeManager } from '../widget/ChallengeManager/';
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

      <div className="mt-[24px]">
        <ChallengeManager />
      </div>
    </Page>
  );
};
