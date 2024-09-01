import './index.css';

import Logo from '../../../assets/logo1.png';
import { Calendar } from './Calendar';
import { MetaText } from './MetaText';

export const ChallengeWidget = () => {
  return (
    <div className="w-screen h-screen bg-black flex justify-center overflow-y-scroll">
      <div className="w-[500px]">
        <div className="flex justify-center items-center py-[50px] px-[24px]">
          <img className="w-[500px]" src={Logo} alt="" />
        </div>

        <div className="flex justify-between items-center px-[24px]">
          <MetaText leftLabel="start: " rightLabel="01/09/24" />
          <MetaText leftLabel="name: " rightLabel="Sugar free" />
        </div>

        <Calendar />
      </div>
    </div>
  );
};
