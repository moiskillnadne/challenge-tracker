import { useNavigate } from 'react-router-dom'

import { Routes } from '~/shared/constants'
import { PlusIcon } from '~/shared/icon'

export const CreateChallengeButton = () => {
  const navigate = useNavigate()

  return (
    <div
      className="flex justify-center items-center h-[81px] w-[150px] border-2 border-dotted cursor-default px-[4px] py-[4px] hover:border-solid"
      onClick={() => navigate(Routes.CREATE_CHALLENGE)}
    >
      <div className="h-[75px] w-[75px]">
        <PlusIcon color="black" />
      </div>
    </div>
  )
}
