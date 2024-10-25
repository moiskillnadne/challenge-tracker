import { useRef, useState } from 'react';
import { Modal, useModalState } from '../../shared/ui';
import { useCustomTranslation } from '../../feature/translation';

type Props = {
  goal: string;
  isActive: boolean;
  daysLeft: number;
  onClick: () => void;

  onChallengeRemove: () => void;
};

export const ChallengeGridItem = ({
  goal,
  isActive,
  daysLeft,
  onClick,
  onChallengeRemove,
}: Props) => {
  const { t } = useCustomTranslation();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const timerRef = useRef<number | null>(null);

  const { isOpen, close, open } = useModalState();

  const handleLongPress = () => {
    setIsEditMode(false);
    setIsPressed(false);
    open();
  };

  const handleTouchStart = () => {
    // 100ms delay for press animation
    setTimeout(() => {
      setIsPressed(true);
      setIsEditMode(true);
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
      setIsPressed(false);
      onClick();
    }
  };

  const pressedAnimationMap = {
    false: '',
    true: 'scale-90',
  };

  return (
    <>
      <div
        className={`${pressedAnimationMap[`${isPressed}`]} duration-700  flex flex-col items-start w-[150px] border-2 border-dotted cursor-default px-[4px] py-[4px] hover:border-solid select-none`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
      >
        <div className="text-white font-bold text-[18px] cursor-default select-none">{goal}</div>
        <div className="text-white text-[14px] text-white/75 cursor-default select-none">
          {isActive ? 'in progress' : 'completed'}
        </div>
        <div className="text-white/75 text-[14px] cursor-default select-none">
          Days left: <span className="font-bold">{daysLeft}</span>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={close}
        title={t('doYouWantToRemoveChallenge')}
        leftButton={{ label: t('no'), onClick: close, color: 'black' }}
        rightButton={{
          label: t('yes'),
          onClick: () => {
            onChallengeRemove();
            close();
          },
          color: 'red',
        }}
      >
        <></>
      </Modal>
    </>
  );
};
