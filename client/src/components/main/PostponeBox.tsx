import { useAtom } from 'jotai';
import { memo, ReactElement } from 'react';
import styled from 'styled-components';

import Text from '../Text';
import Button from '../Button';

import { ACTIVE_TODO_STATE, PRIMARY_COLORS, POSTPONE_TOOLTIP_MESSAGE } from '@util/Constants';
import { isOnProgress } from '@util/GlobalState';
import { Tooltip } from '@components/Tooltip';

const { red, white } = PRIMARY_COLORS;

const StyledPostponeBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${red};
  line-height: 25px;
  letter-spacing: 0em;
  align-items: flex-start;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 161px;
  padding: 20px;
  gap: 20px;
  position: absolute;
  left: 40px;
  top: 60px;
`;

interface PostponeProps {
  setPostpone: Function;
  postponeOptions: string[];
  time?: number;
  setTime?: Function;
  handleOnToggle: Function;
}

const PostponeBox = (props: PostponeProps): ReactElement => {
  const { setPostpone, postponeOptions, handleOnToggle } = props;
  const [progressState] = useAtom(isOnProgress);

  const handlePosponeClicked = (text: string): void => {
    setPostpone(text);
    if (progressState === ACTIVE_TODO_STATE.working) {
      handleOnToggle();
    }
  };

  return (
    <StyledPostponeBox>
      {postponeOptions.map(
        (text: string): ReactElement => (
          <Tooltip key={text} message={POSTPONE_TOOLTIP_MESSAGE[text]}>
            <Button
              onClick={() => {
                handlePosponeClicked(text);
              }}
            >
              {<Text text={text} color={white} fontFamily={'Noto Sans'} fontSize={'18px'} fontWeight={'700'} />}
            </Button>
          </Tooltip>
        ),
      )}
    </StyledPostponeBox>
  );
};
export default memo(PostponeBox);
