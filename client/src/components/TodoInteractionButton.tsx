import { useAtom } from 'jotai';
import { ReactElement, useMemo, memo } from 'react';
import styled from 'styled-components';

import Done from '../images/Done.svg';
import Postpone from '../images/Postpone.svg';
import Button from '../components/Button';
import Image from '../components/Image';

import useButtonConfig from '../hooks/useButtonConfig';
import { isOnProgress } from '../util/GlobalState';

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const TodoInteractionButton = (): ReactElement => {
  const [userState] = useAtom(isOnProgress);
  const [buttonConfig, handleOnToggle] = useButtonConfig(userState);

  const startPauseButton = useMemo(() => {
    return <Button context={<Image src={buttonConfig.src} />} onClick={handleOnToggle} />;
  }, [buttonConfig.src]);

  const postponeDoneButton = useMemo(() => {
    return (
      <>
        <Button context={<Image src={Postpone} />} />
        <Button context={<Image src={Done} />} />
      </>
    );
  }, []);

  return (
    <ButtonWrapper>
      {startPauseButton}
      {postponeDoneButton}
    </ButtonWrapper>
  );
};

export default memo(TodoInteractionButton);
