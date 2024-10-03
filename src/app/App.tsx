import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ApplicationRouter from '../pages';
import i18nManager from './system/i18n.manager';
import { useEffect } from 'react';
import LocalStorageService from '../shared/lib/LocalStorage';

void i18nManager.initialize();

export const queryClient = new QueryClient();

function App() {
  // On App Startup
  useEffect(() => {
    // Clearing old logic
    LocalStorageService.removeItem('streak');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationRouter />
    </QueryClientProvider>
  );
}

export default App;
