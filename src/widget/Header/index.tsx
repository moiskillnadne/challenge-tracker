import { useQuery } from '@tanstack/react-query';
import { accountService } from '../../shared/api/account.service';
import { useLocation, useNavigate } from 'react-router-dom';
import { LanguageSwitcher, useCustomTranslation } from '../../feature/translation';

export const Header = () => {
  const navigator = useNavigate();
  const { t } = useCustomTranslation();
  const location = useLocation();

  const query = useQuery({ queryKey: ['/protected/me'], queryFn: accountService.getAccountInfo });

  const isAuthenticated = query.data?.data.details.user.email;

  const onNavigationClick = () => {
    if (!isAuthenticated) {
      return navigator('/login');
    }

    if (location.pathname === '/account') {
      return navigator('/');
    }

    return navigator('/account');
  };

  const getButtonLabel = () => {
    if (!isAuthenticated) {
      return t('login');
    }

    if (location.pathname === '/account') {
      return t('home');
    }

    return t('account');
  };

  return (
    <div className="relative py-[12px] px-[24px] flex justify-between">
      <button
        className="text-white font-bold text-[26px] cursor-pointer"
        onClick={onNavigationClick}
      >
        {getButtonLabel()}
      </button>

      <div className="">
        <LanguageSwitcher />
      </div>
    </div>
  );
};
