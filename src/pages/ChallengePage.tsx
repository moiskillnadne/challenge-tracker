import { useParams, useSearchParams } from 'react-router-dom'

import { ChallengeType } from '~/entity/challenge'
import { useCustomTranslation } from '~/feature/translation'
import { Routes } from '~/shared/constants'
import { Page, PageContent } from '~/shared/ui'
import { ChallengeWidget } from '~/widget/Challenge'
import { getBackgroundColor } from '~/widget/Challenge/lib/theme-manager.ts'
import { Header } from '~/widget/Header'

const ChallengePage = () => {
  const { challengeId } = useParams()
  const [searchParams] = useSearchParams()
  const { t } = useCustomTranslation()

  const challengeType = searchParams.get('type') as ChallengeType

  if (!challengeId || !challengeType) {
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
    <Page bgBackground={getBackgroundColor(challengeType)}>
      <PageContent>
        <ChallengeWidget
          challengeId={challengeId}
          challengeType={challengeType}
        />
      </PageContent>
    </Page>
  )
}

export default ChallengePage
