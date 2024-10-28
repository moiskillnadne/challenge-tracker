import { useParams } from 'react-router-dom'

import { useCustomTranslation } from '~/feature/translation'
import { Routes } from '~/shared/constants'
import { Page, PageContent } from '~/shared/ui'
import { ChallengeWidget } from '~/widget/Challenge'
import { Header } from '~/widget/Header'

const ChallengePage = () => {
  const { challengeId } = useParams()
  const { t } = useCustomTranslation()

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
    )
  }

  return (
    <Page>
      <Header
        navigationButtonShown={true}
        navigateTo={Routes.HOME}
        labelNavigationButton={t('home')}
      />

      <PageContent>
        <ChallengeWidget challengeId={challengeId} />
      </PageContent>
    </Page>
  )
}

export default ChallengePage
