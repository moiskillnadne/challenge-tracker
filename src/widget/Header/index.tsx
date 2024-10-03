import { useQuery } from '@tanstack/react-query';
import { accountService } from '../../shared/api/account.service';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher, useCustomTranslation } from '../../feature/translation';

export const Header = () => {
  const navigator = useNavigate();
  const { t } = useCustomTranslation();

  const query = useQuery({ queryKey: ['/protected/me'], queryFn: accountService.getAccountInfo });

  const isAuthenticated = query.data?.data.details.user.email;

  const onLoginClick = () => {
    return navigator('/login');
  };

  const onAccountClick = () => {
    return navigator('/account');
  };

  return (
    <div className="relative py-[12px] px-[24px] flex justify-between">
      <button
        className="text-white font-bold text-[26px] cursor-pointer"
        onClick={isAuthenticated ? onAccountClick : onLoginClick}
      >
        {isAuthenticated ? t('account') : t('login')}
      </button>

      <div className="">
        <LanguageSwitcher />
      </div>
    </div>
  );
};
