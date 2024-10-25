import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '../../shared/ui';
import { Routes } from '../../shared/constants';

export const CreateChallengeButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-start h-[81px] border-2 border-dotted cursor-default px-[4px] py-[4px] hover:border-solid"
      onClick={() => navigate(Routes.CREATE_CHALLENGE)}
    >
      <PlusIcon color="white" />
    </div>
  );
};
