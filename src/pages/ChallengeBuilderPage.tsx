import { useCustomTranslation } from '../feature/translation'
import { Routes } from '../shared/constants'
import { Page, PageContent } from '../shared/ui'
import { ChallengeBuilderWidget } from '../widget/ChallengeBuilder'
import { Header } from '../widget/Header'

export const ChallengeBuilderPage = () => {
  const { t } = useCustomTranslation()

  return (
    <Page>
      <Header
        navigationButtonShown={true}
        navigateTo={Routes.HOME}
        labelNavigationButton={t('home')}
      />

      <PageContent>
        <ChallengeBuilderWidget />
      </PageContent>
    </Page>
  )
}
