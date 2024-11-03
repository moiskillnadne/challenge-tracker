import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AppToastContainer } from './system/AppToastContainer'
import i18nManager from './system/i18n.manager'

import ApplicationRouter from '~/pages'
import { useVisitorId } from '~/shared/hooks'

void i18nManager.initialize()

export const queryClient = new QueryClient()

function App() {
  useVisitorId()

  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationRouter />
      <AppToastContainer />
    </QueryClientProvider>
  )
}

export default App
