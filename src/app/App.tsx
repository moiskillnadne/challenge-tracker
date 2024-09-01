import ApplicationRouter from '../pages';
import i18nManager from './system/i18n.manager';

void i18nManager.initialize();

function App() {
  return <ApplicationRouter />;
}

export default App;
