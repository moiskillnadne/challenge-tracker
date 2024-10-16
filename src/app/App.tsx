import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ApplicationRouter from '../pages';
import i18nManager from './system/i18n.manager';
import { useVisitorId } from '../shared/hooks';

void i18nManager.initialize();

export const queryClient = new QueryClient();

function App() {
  useVisitorId();

  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationRouter />
    </QueryClientProvider>
  );
}

export default App;
