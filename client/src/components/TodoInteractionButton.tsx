import { useAtom } from 'jotai';
import { ReactElement, useMemo, memo } from 'react';
import styled from 'styled-components';

import Done from '../images/Done.svg';
import Postpone from '../images/Postpone.svg';
import Button from '../components/Button';
import Image from '../components/Image';

import { postponeClicked } from '@util/GlobalState.js';

import useElapsedTime from '../hooks/useElapsedTime';
import useDone from '../hooks/useDone';

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
  const [, , , time, setTime] = useElapsedTime();
  const [setDone] = useDone();

  const startPauseButton = useMemo(() => {
    return <Button context={<Image src={buttonConfig.src} />} onClick={() => handleOnToggle()} />;
  }, [buttonConfig.src]);

  const handleDoneClicked = (): void => {
    setDone(time);
    handleOnToggle();
    setTime(0);
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
