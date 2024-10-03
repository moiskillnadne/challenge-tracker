import { ChallengeDTO } from '../../../shared/api/challenge.service';

type ChallengeItem = {
  id: string;
  goal: string;
  daysLeft: number;
  isActive: boolean;
};

export const mapChallengeToItem = (challenge: ChallengeDTO): ChallengeItem => {
  const startedAt = new Date(challenge.startedAtDate);

  const endAt = new Date(startedAt);
  endAt.setDate(startedAt.getDate() + challenge.duration);

  const today = new Date();
  const timeDiff = endAt.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const isActive = daysLeft > 0;

  return {
    id: challenge.id,
    goal: challenge.goal,
    daysLeft: daysLeft < 0 ? 0 : daysLeft,
    isActive: isActive,
  };
};
