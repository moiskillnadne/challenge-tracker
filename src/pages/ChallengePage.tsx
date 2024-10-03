import { Page } from '../shared/ui';
import { ChallengeWidget } from '../widget/Challenge';
import { Header } from '../widget/Header';

const ChallengePage = () => {
  return (
    <Page>
      <Header />
      <ChallengeWidget />
    </Page>
  );
};

export default ChallengePage;
