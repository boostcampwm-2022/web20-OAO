import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { memo, ReactElement } from 'react';
import { toast } from 'react-toastify';

import Button from '@components/Button';
import Pause from '@images/Pause';
import Start from '@images/Start';
import { elapsedTimeAtom, isOnProgress, setTimerAtom, todoList } from '@util/GlobalState';

interface ImageButtonStyle {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
}

const StartPauseButton = (imageButtonStyle: ImageButtonStyle): ReactElement => {
  const [progressState] = useAtom(isOnProgress);
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);
  const elapsedTime = useAtomValue(elapsedTimeAtom);
  const setTimer = useSetAtom(setTimerAtom);

  const startPause = (): void => {
    setTimer();

    if (progressState !== 'working') {
      return;
    }

    todoListAtom
      .updateElapsedTime(elapsedTime)
      .then((newTodoList) => {
        setTodoListAtom(newTodoList);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Button
      context={progressState === 'working' ? <Pause {...imageButtonStyle} /> : <Start {...imageButtonStyle} />}
      onClick={startPause}
    />
  );
};

export default memo(StartPauseButton);
