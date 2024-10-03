import { useParams } from 'react-router-dom';
import { Page } from '../shared/ui';
import { ChallengeWidget } from '../widget/Challenge';
import { Header } from '../widget/Header';

const ChallengePage = () => {
  const { challengeId } = useParams();

  console.log(`[ChallengePage] Id`, challengeId);

  if (!challengeId) {
    return (
      <Page>
        <Header />

        <div>Sorry, something wrong with your URL.</div>
      </Page>
    );
  }

  return (
    <Page>
      <Header />
      <ChallengeWidget challengeId={challengeId} />
    </Page>
  );
};

export default ChallengePage;
