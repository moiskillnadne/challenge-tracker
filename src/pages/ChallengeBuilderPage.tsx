import { Page, PageContent } from '~/shared/ui'
import { ChallengeBuilderWidget } from '~/widget/ChallengeBuilder'

export const ChallengeBuilderPage = () => {
  return (
    <Page>
      <PageContent>
        <ChallengeBuilderWidget />
      </PageContent>
    </Page>
  )
}
