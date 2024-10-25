import { useParams } from 'react-router-dom';
import { Page } from '../shared/ui';
import { ChallengeWidget } from '../widget/Challenge';
import { Header } from '../widget/Header';
import { Routes } from '../shared/constants';
import { useCustomTranslation } from '../feature/translation';

const ChallengePage = () => {
  const { challengeId } = useParams();
  const { t } = useCustomTranslation();

  if (!challengeId) {
    return (
      <Page>
        <Header
          navigationButtonShown={true}
          navigateTo={Routes.HOME}
          labelNavigationButton={t('home')}
        />

        <div>Sorry, something wrong with your URL.</div>
      </Page>
    );
  }

  return (
    <Page>
      <Header
        navigationButtonShown={true}
        navigateTo={Routes.HOME}
        labelNavigationButton={t('home')}
      />
      <ChallengeWidget challengeId={challengeId} />
    </Page>
  );
};

export default ChallengePage;
