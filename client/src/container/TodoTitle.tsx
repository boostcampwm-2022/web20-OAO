import { ReactElement } from 'react';
import Text from '@components/Text';

import { InputTodo } from '@core/todo/todoList.js';

const TodoTitle = ({ activeTodo }: { activeTodo: InputTodo }): ReactElement => {
  return <Text text={activeTodo.title} fontSize={'54px'} fontWeight={'700'} margin={'35px 0'} />;
};
export default TodoTitle;
