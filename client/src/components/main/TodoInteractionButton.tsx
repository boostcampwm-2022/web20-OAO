import { useAtom, useAtomValue } from 'jotai';
import { ReactElement, memo, useEffect } from 'react';

import Button from '@components/Button';

import Postpone from '@images/Postpone';
import Done from '@images/Done';

import { asyncActiveTodo, elapsedTimeAtom, postponeClicked } from '@util/GlobalState.js';

import useDone from '@hooks/useDone.js';
import StartPauseButton from '@components/StartPauseButton';

interface ImageButtonStyle {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
}

const TodoInteractionButton = (imageButtonStyle: ImageButtonStyle): ReactElement => {
  const [isPostpone, setIsPostpone] = useAtom(postponeClicked);
  const [setDone] = useDone();
  const [elapsedTime, setElapsedTime] = useAtom(elapsedTimeAtom);
  const activeTodo = useAtomValue(asyncActiveTodo);

  useEffect(() => {
    if (activeTodo !== undefined && activeTodo.elapsedTime !== elapsedTime) {
      setElapsedTime(activeTodo.elapsedTime);
    }
  }, [activeTodo]);

  return (
    <>
      <StartPauseButton {...imageButtonStyle} />
      <Button context={<Postpone {...imageButtonStyle} />} onClick={() => setIsPostpone(!isPostpone)} />
      <Button context={<Done {...imageButtonStyle} />} onClick={setDone} />
    </>
  );
};

export default memo(TodoInteractionButton);
