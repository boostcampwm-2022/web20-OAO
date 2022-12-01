import { useState } from 'react';
import { useAtom } from 'jotai';

import Start from '../images/Start.svg';
import Pause from '../images/Pause.svg';

import { isOnProgress } from '../util/GlobalState';

interface ButtonConfig {
  src: string;
  onClick: () => void;
}

interface StartPause {
  working: ButtonConfig;
  relaxing: ButtonConfig;
}

const START_PAUSE: StartPause = {
  working: {
    src: Pause,
    onClick: () => {
      console.log('working111');
    },
  },
  relaxing: {
    src: Start,
    onClick: () => {
      console.log('relaxing');
    },
  },
};

const useButtonConfig = (userState: String, startTimer: Function, stopTimer: Function): any[] => {
  const [buttonConfig, setButtonConfig] = useState(START_PAUSE[userState as keyof StartPause]);
  const [, setIsOnProgress] = useAtom(isOnProgress);

  const handleOnToggle = (): void => {
    if (buttonConfig.src === Start) {
      setIsOnProgress('working');
      startTimer();
      return setButtonConfig(START_PAUSE.working);
    }
    setIsOnProgress('relaxing');
    stopTimer();
    setButtonConfig(START_PAUSE.relaxing);
  };

  return [buttonConfig, handleOnToggle];
};

export default useButtonConfig;
