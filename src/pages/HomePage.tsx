import { Page, PageContent } from '~/shared/ui'
import { ChallengeManager } from '~/widget/ChallengeManager/'

export const HomePage = () => {
  return (
    <Page>
      <PageContent>
        <ChallengeManager />
      </PageContent>
    </Page>
  )
}
