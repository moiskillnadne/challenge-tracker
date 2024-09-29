import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ApplicationRouter from '../pages';
import i18nManager from './system/i18n.manager';

void i18nManager.initialize();

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationRouter />
    </QueryClientProvider>
  );
}

export default App;
