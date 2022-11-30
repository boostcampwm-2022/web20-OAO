import { useAtom } from 'jotai';
import { ReactElement, useMemo, memo } from 'react';
import styled from 'styled-components';

import Done from '../../images/Done.svg';
import Postpone from '../../images/Postpone.svg';
import Button from '../Button';
import Image from '../Image';

import { postponeClicked, isOnProgress } from '@util/GlobalState.js';
import { ACTIVE_TODO_STATE } from '@util/Constants';

import useElapsedTime from '../../hooks/useElapsedTime.js';
import useDone from '../../hooks/useDone.js';

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
interface ButtonConfig {
  src: 'string';
}
interface ButtonProps {
  buttonConfig: ButtonConfig;
  handleOnToggle: Function;
}

const TodoInteractionButton = ({ buttonConfig, handleOnToggle }: ButtonProps): ReactElement => {
  const [isPostpone, setIsPostpone] = useAtom(postponeClicked);
  const [progressState] = useAtom(isOnProgress);
  const [, , , time, setTime] = useElapsedTime();
  const [setDone] = useDone();

  const startPauseButton = useMemo(() => {
    return <Button context={<Image src={buttonConfig.src} />} onClick={() => handleOnToggle()} />;
  }, [buttonConfig.src]);

  const handleDoneClicked = (): void => {
    setDone(time);
    setTime(0);
    if (progressState === ACTIVE_TODO_STATE.working) {
      handleOnToggle();
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
