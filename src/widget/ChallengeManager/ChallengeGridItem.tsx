import { useEffect, useRef, useState } from 'react';

type Props = {
  goal: string;
  isActive: boolean;
  daysLeft: number;
  onClick: () => void;
};

export const ChallengeGridItem = ({ goal, isActive, daysLeft, onClick }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleLongPress = () => {
    setIsEditMode(true);
    setIsPressed(false);
  };

  const handleTouchStart = () => {
    // 100ms delay for press animation
    setTimeout(() => {
      setIsPressed(true);
    }, 100);

    timerRef.current = setTimeout(handleLongPress, 750); // 750ms for long press
  };

  const handleTouchEnd = () => {
    setIsPressed(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (isEditMode) {
      // Do some logic
      console.log('Open edit mode');
      return setIsEditMode(false);
    }

    if (!isEditMode) {
      onClick();
    }
  };

  const pressedAnimationMap = {
    false: '',
    true: 'scale-90',
  };

  useEffect(() => {
    console.log(`isEditMode: ${isEditMode}`);
  }, [isEditMode]);

  return (
    <div
      className={`${pressedAnimationMap[`${isPressed}`]} duration-700  flex flex-col items-start w-[150px] border-2 border-dotted cursor-default px-[4px] py-[4px] hover:border-solid`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
    >
      <div className="text-white font-bold text-[18px]">{goal}</div>
      <div className="text-white text-[14px] text-white/75">
        {isActive ? 'in progress' : 'completed'}
      </div>
      <div className="text-white/75 text-[14px]">
        Days left: <span className="font-bold">{daysLeft}</span>
      </div>
    </div>
  );
};
