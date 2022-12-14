import { ReactElement, memo } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';
import { Todo } from '@todo/todo';
import Text from '@components/Text';
import Button from '@components/Button';
import Image from '@components/Image';
import { getCheckTodoStateHandler, getTodoStateIcon } from '@util/todos.util';
import { useAtom } from 'jotai';
import { todoList as todoListAtom } from '@util/GlobalState';

const { gray, lightestGray, black } = PRIMARY_COLORS;

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
  transition: outline 0.3s, transform 1s;
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
  id,
  getOnClick,
}: {
  todo: Todo;
  x: number;
  y: number;
  id: string;
  getOnClick: (
    type: 'Todo' | 'Vertex' | 'None',
    id: string,
    targetPos: { x: number; y: number },
  ) => (event: React.MouseEvent) => void;
}): ReactElement => {
  const [todoList, setTodoList] = useAtom(todoListAtom);
  const style = {
    '--x': `${x}px`,
    '--y': `${y}px`,
  };
  return (
    <Wrapper style={style as React.CSSProperties} onClick={getOnClick('Todo', id, { x, y })}>
      <UpperRow>
        <Button
          context={<Image width="30px" height="30px" src={getTodoStateIcon(todo.toPlain())} />}
          onClick={getCheckTodoStateHandler(todo.toPlain(), todoList, setTodoList)}
        />
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

export default memo(TodoBlock);
