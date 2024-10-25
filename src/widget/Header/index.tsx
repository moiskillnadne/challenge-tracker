import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../../feature/translation';

type PropsWithNavidation = {
  navigationButtonShown: true;
  navigateTo: string;
  labelNavigationButton: string;
};

type PropsWithoutNavigation = {
  navigationButtonShown: false;
};

type Props = PropsWithNavidation | PropsWithoutNavigation;

export const Header = (props: Props) => {
  const navigator = useNavigate();

  const onNavigationClick = () => {
    if (!props.navigationButtonShown) {
      return;
    }

    return navigator(props.navigateTo);
  };

  return (
    <div className="relative py-[12px] px-[24px] flex justify-between">
      {props.navigationButtonShown ? (
        <button
          className="text-white font-bold text-[26px] cursor-pointer"
          onClick={onNavigationClick}
        >
          {props.labelNavigationButton}
        </button>
      ) : (
        <div></div>
      )}

      <div>
        <LanguageSwitcher />
      </div>
    </div>
  );
};
