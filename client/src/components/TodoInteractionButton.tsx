import { useAtom } from 'jotai';
import { ReactElement, useMemo, memo } from 'react';
import styled from 'styled-components';

import Done from '../images/Done.svg';
import Postpone from '../images/Postpone.svg';
import Button from '../components/Button';
import Image from '../components/Image';

import useButtonConfig from '../hooks/useButtonConfig';
import { isOnProgress, postponeClicked } from '../util/GlobalState';

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const done = (): void => {
  console.log('done');
};

const TodoInteractionButton = (): ReactElement => {
  const [userState] = useAtom(isOnProgress);
  const [isPostpone, setIsPostpone] = useAtom(postponeClicked);
  const [buttonConfig, handleOnToggle] = useButtonConfig(userState);

  const startPauseButton = useMemo(() => {
    return <Button context={<Image src={buttonConfig.src} />} onClick={handleOnToggle} />;
  }, [buttonConfig.src]);

  const postponeDoneButton = useMemo(() => {
    return <Button context={<Image src={Postpone} />} onClick={() => setIsPostpone(!isPostpone)} />;
  }, [isPostpone]);

  const doneButton = useMemo(() => {
    return <Button context={<Image src={Done} />} onClick={done} />;
  }, []);

  return (
    <ButtonWrapper>
      {startPauseButton}
      {postponeDoneButton}
      {doneButton}
    </ButtonWrapper>
  );
};

export default memo(TodoInteractionButton);
