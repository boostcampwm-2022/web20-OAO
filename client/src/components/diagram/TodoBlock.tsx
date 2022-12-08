import { ReactElement } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';
import { Todo } from '@todo/todo';
import Text from '@components/Text';

const { green, yellow, gray, lightestGray, black } = PRIMARY_COLORS;

const DAY = 1000 * 60 * 60 * 24;

const Wrapper = styled.div`
  position: absolute;
  width: max-content;
  height: max-content;
  padding: 15px 20px 15px 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${lightestGray};
  transform: translate(var(--x), var(--y));
  cursor: pointer;
  transition: outline 0.3s;
  outline: 6px solid transparent;
  box-sizing: border-box;
  &:hover {
    outline: 3px solid ${gray};
  }
`;

const UpperRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const LowerRow = styled(Text)`
  margin-top: 6px;
  justify-self: right;
  text-align: right;
  color: ${gray};
  text-overflow: ellipsis;
`;

const Marker = styled.div<{ state: 'DONE' | 'READY' | 'WAIT' }>`
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  background-color: ${(props) => (props.state === 'READY' ? green : props.state === 'WAIT' ? yellow : gray)};
`;

const Title = styled(Text)`
  margin-left: 10px;
  width: 160px;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const importanceToString = (importance: number): string => {
  return +importance === 3 ? '긴급' : +importance === 2 ? '보통' : '여유';
};

const remainingDayToString = (until: Date): string => {
  const today = Math.floor(new Date().getTime() / DAY);
  const untilDate = Math.floor(until.getTime() / DAY);
  const remaining = today - untilDate;
  return remaining <= 0 ? `D-${-remaining}` : `D+${remaining}`;
};

const TodoBlock = ({
  todo,
  x,
  y,
  onPopUp,
}: {
  todo: Todo;
  x: number;
  y: number;
  onPopUp: (event: React.MouseEvent) => void;
}): ReactElement => {
  const style = {
    '--x': `${x}px`,
    '--y': `${y}px`,
  };
  return (
    <Wrapper style={style as React.CSSProperties} onClick={onPopUp}>
      <UpperRow>
        <Marker state={todo.state} />
        <Title
          text={todo.title}
          textAlign={'right'}
          fontWeight={'700'}
          fontFamily={'Nanum Myeongjo'}
          color={black}
          fontSize={'16px'}
        />
      </UpperRow>
      <LowerRow
        text={`${importanceToString(todo.importance)}, ${remainingDayToString(todo.until)}`}
        textAlign={'right'}
        fontWeight={'700'}
        fontFamily={'Nanum Myeongjo'}
        color={gray}
        fontSize={'14px'}
      />
    </Wrapper>
  );
};

export default TodoBlock;
