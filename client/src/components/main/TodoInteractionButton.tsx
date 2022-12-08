import { useAtom, useSetAtom } from 'jotai';
import { ReactElement, useMemo, memo } from 'react';
import styled from 'styled-components';

import Button from '@components/Button';

import Start from '@images/Start';
import Pause from '@images/Pause';
import Postpone from '@images/Postpone';
import Done from '@images/Done';

import { postponeClicked, isOnProgress, setTimerAtom } from '@util/GlobalState.js';

import useDone from '@hooks/useDone.js';

interface ImageButtonStyle {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
}

const TodoInteractionButton = (imageButtonStyle: ImageButtonStyle): ReactElement => {
  const [isPostpone, setIsPostpone] = useAtom(postponeClicked);
  const [progressState] = useAtom(isOnProgress);
  const [setDone] = useDone();
  const setTimer = useSetAtom(setTimerAtom);

  const startPauseButton = useMemo(() => {
    const button = progressState === 'working' ? <Pause {...imageButtonStyle} /> : <Start {...imageButtonStyle} />;
    return <Button context={button} onClick={setTimer} />;
  }, [progressState]);

  return (
    <>
      {startPauseButton}
      <Button context={<Postpone {...imageButtonStyle} />} onClick={() => setIsPostpone(!isPostpone)} />
      <Button context={<Done {...imageButtonStyle} />} onClick={setDone} />
    </>
  );
};

export default memo(TodoInteractionButton);
