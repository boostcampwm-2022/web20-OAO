import { memo, ReactElement } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '../util/Constants';

import Text from './Text';
import Button from './Button';

import useTodoList from '../hooks/useTodoList';
import { useAtom } from 'jotai';
import { isOnProgress, postponeClicked } from '@util/GlobalState';
import useElapsedTime from '../hooks/useElapsedTime';
import useButtonConfig from '../hooks/useButtonConfig';

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
  postponeOptions: any[];
  time: number;
  setTime: Function;
  stopTimer: Function;
}
const PostponeBox = (props: PostponeProps): ReactElement => {
  const { setPostpone, postponeOptions, time, setTime, stopTimer } = props;

  const handlePosponeClicked = (text: string): void => {
    stopTimer();
    setPostpone(time, text);
    setTime(0);
  };

  return (
    <StyledPostponeBox>
      {postponeOptions.map((text: string): ReactElement => {
        return (
          <Button
            key={text}
            context={<Text text={text} color={white} fontFamily={'Noto Sans'} fontSize={'18px'} fontWeight={'700'} />}
            onClick={() => {
              handlePosponeClicked(text);
            }}
          />
        );
      })}
    </StyledPostponeBox>
  );
};
export default memo(PostponeBox);
