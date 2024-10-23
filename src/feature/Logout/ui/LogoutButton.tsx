import { useCallback } from 'react';
import { useCustomTranslation } from '../../translation';
import { useLogoutMutation } from '../lib/useLogoutMutation';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const { t } = useCustomTranslation();

  const navigate = useNavigate();

  const mutation = useLogoutMutation({
    onSuccess: () => navigate('/login'),
  });

  const logout = useCallback(() => {
    mutation.mutate();
  }, []);

  return (
    <div className="p-[12px]">
      <button
        className="duration-300 bg-blue-500 text-white/50 rounded-full h-full hover:text-white/75"
        onClick={logout}
      >
        {t('logout')}
      </button>
    </div>
  );
};
