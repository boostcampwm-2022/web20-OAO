import { useAtom, useSetAtom } from 'jotai';
import { ReactElement, useMemo, memo } from 'react';
import styled from 'styled-components';

import Done from '@images/Done.svg';

import Button from '@components/Button';
import Image from '@components/Image';

import Start from '@images/Start.svg';
import Pause from '@images/Pause.svg';
import Postpone from '@images/Postpone.svg';

import { postponeClicked, isOnProgress, setTimerAtom } from '@util/GlobalState.js';
import { ACTIVE_TODO_STATE } from '@util/Constants';
import useDone from '@hooks/useDone.js';

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const TodoInteractionButton = (): ReactElement => {
  const [isPostpone, setIsPostpone] = useAtom(postponeClicked);
  const [progressState] = useAtom(isOnProgress);
  const [setDone] = useDone();
  const setTimer = useSetAtom(setTimerAtom);

  const startPauseButton = useMemo(() => {
    return <Button context={<Image src={progressState === 'working' ? Pause : Start} />} onClick={setTimer} />;
  }, [progressState]);

  const handleDoneClicked = (): void => {
    setDone();
    if (progressState === ACTIVE_TODO_STATE.working) {
      // handleOnToggle();
    }
  };

  return (
    <ButtonWrapper>
      {startPauseButton}
      <Button context={<Image src={Postpone} />} onClick={() => setIsPostpone(!isPostpone)} />
      <Button context={<Image src={Done} />} onClick={handleDoneClicked} />
    </ButtonWrapper>
  );
};

export default memo(TodoInteractionButton);
