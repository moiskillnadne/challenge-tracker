import { Page } from '../shared/ui';
import { ChallengeBuilderWidget } from '../widget/ChallengeBuilder';
import { Header } from '../widget/Header';

export const ChallengeBuilderPage = () => {
  return (
    <Page>
      <Header />

      <ChallengeBuilderWidget />
    </Page>
  );
};
