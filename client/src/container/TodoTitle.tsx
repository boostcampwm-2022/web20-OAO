import { ReactElement } from 'react';
import Text from '../components/Text';

import { Todo } from '../core/todo/index';

const TodoTitle = ({ activeTodo }: { activeTodo: Todo }): ReactElement => {
  return <Text text={activeTodo.title} fontSize={'54px'} fontWeight={'700'} margin={'35px 0'} />;
};
export default TodoTitle;
