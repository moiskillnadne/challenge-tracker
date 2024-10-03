import { useState } from 'react';
import { RightArrow } from '../../shared/ui';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { challengeService } from '../../shared/api/challenge.service';
import { convertDate } from '../Challenge/lib/convertDate';
import { getDaysInMonth } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const ChallengeBuilderWidget = () => {
  const [goal, setGoal] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: challengeService.createChallenge,
    onSuccess() {
      const queryClient = new QueryClient();

      queryClient.invalidateQueries({
        queryKey: ['/challenge'],
      });

      return navigate(`/account`);
    },
  });

  const onCreateClick = () => {
    if (goal.length < 1) {
      throw new Error(`[ChallengeBuilderWidget:onCreate] Goal length should be more than 1`);
    }

    const now = new Date();

    const daysInMonth = getDaysInMonth(now);

    const startDate = convertDate(1);

    mutation.mutate({
      goal,
      description,
      startedAtDate: startDate,
      duration: daysInMonth,
    });
  };

  return (
    <div className="w-full px-[16px] my-[64px] flex justify-center">
      <div className="flex flex-col gap-[12px] items-center">
        <div className="text-white font-bold text-[26px]">Create a new challenge</div>

        <input
          type="text"
          name="goal"
          id="input-goal"
          placeholder="Goal"
          className="bg-transparent focus:outline-none duration-300 h-[40px] placeholder-white/50 border-b-2 border-black hover:border-white/20 focus:border-white/50 text-white w-[300px]"
          onChange={(e) => setGoal(e.target.value)}
        />
        <input
          type="text"
          name="description"
          id="input-description"
          placeholder="Description"
          className="bg-transparent focus:outline-none duration-300 h-[40px] placeholder-white/50 border-b-2 border-black hover:border-white/20 focus:border-white/50 text-white w-[300px]"
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="h-[40px] flex gap-[6px] mt-[16px]">
          <button
            className="duration-300 bg-blue-500 text-white/50 rounded-full h-full hover:text-white/75"
            onClick={onCreateClick}
          >
            {mutation.isPending ? (
              <div className="animate-spin h-[32px] w-[32px] border-[2px] rounded-full border-white/50 border-t-white"></div>
            ) : (
              <span className="flex items-center">
                <p className="w-[150px]">Create</p>{' '}
                <div className="w-[32px] h-[32px]">
                  <RightArrow />
                </div>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
