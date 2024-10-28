import { useCallback } from 'react'

import { useNavigate } from 'react-router-dom'

import { useLogoutMutation } from '../lib/useLogoutMutation'

import { useCustomTranslation } from '~/feature/translation'

export const LogoutButton = () => {
  const { t } = useCustomTranslation()

  const navigate = useNavigate()

  const mutation = useLogoutMutation({
    onSuccess: () => navigate('/login'),
  })

  const logout = useCallback(() => {
    mutation.mutate()
  }, [mutation])

  return (
    <div className="p-[12px]">
      <button
        className="duration-300 font-bold text-red/75 rounded-full h-full hover:text-red"
        onClick={logout}
      >
        {t('logout')}
      </button>
    </div>
  )
}
