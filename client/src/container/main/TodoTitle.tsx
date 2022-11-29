import { ReactElement } from 'react';
import styled from 'styled-components';

import Text from '@components/Text';

import { PlainTodo } from '@core/todo/todoList.js';

const Wrapper = styled.div`
  width: 850px;
  text-align: center;
`;

const TodoTitle = ({ activeTodo }: { activeTodo: PlainTodo }): ReactElement => {
  return (
    <Wrapper>
      <Text text={activeTodo.title} fontSize={'54px'} fontWeight={'700'} margin={'35px 0'} />
    </Wrapper>
  );
};
export default TodoTitle;
