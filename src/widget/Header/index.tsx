import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher, useCustomTranslation } from '../../feature/translation';

export const Header = () => {
  const navigator = useNavigate();
  const { t } = useCustomTranslation();

  const onNavigationClick = () => {
    return navigator('/account');
  };

  return (
    <div className="relative py-[12px] px-[24px] flex justify-between">
      <button
        className="text-white font-bold text-[26px] cursor-pointer"
        onClick={onNavigationClick}
      >
        {t('account')}
      </button>

      <div className="">
        <LanguageSwitcher />
      </div>
    </div>
  );
};
