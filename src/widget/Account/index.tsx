import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher, useCustomTranslation } from '../../feature/translation';
import { useQuery } from '@tanstack/react-query';
import { accountService } from '../../shared/api/account.service';

export const AccountWidget = () => {
  const { t } = useCustomTranslation();

  const navigate = useNavigate();

  const query = useQuery({ queryKey: ['/protected/me'], queryFn: accountService.getAccountInfo });

  const onHomePage = () => {
    return navigate('/');
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <button
        className="absolute top-0 left-0 text-white font-bold text-[26px] m-[16px] cursor-pointer"
        onClick={onHomePage}
      >
        {t('home')}
      </button>

      <div className="absolute top-0 right-0">
        <LanguageSwitcher />
      </div>

      <div>
        {query.isLoading && <div className="text-white">Loading...</div>}

        {query.data?.data.details?.user && (
          <div className="text-white">Hello, {query.data.data.details.user.email}</div>
        )}
      </div>
    </div>
  );
};
