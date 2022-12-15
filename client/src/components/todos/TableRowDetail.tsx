import { ReactElement, memo } from 'react';
import styled from 'styled-components';

import { PRIMARY_COLORS, TABLE_ROW_DETAIL_TYPE } from '@util/Constants';
import { getElapsedTimeText, isPlainTodo } from '@util/Common';
import { PlainTodo } from '@todo/todo.type';

import TodoTitleList from '@components/todos/TodoTitleList';
import Text from '@components/Text';
import { asyncActiveTodo, isOnProgress } from '@util/GlobalState';
import { useAtomValue } from 'jotai';

const { red } = PRIMARY_COLORS;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid #e2e2e2;
`;

const DetailWrapper = styled.div`
  text-align: left;
  flex-basis: fit-content;
`;

const BlankDiv = styled.div`
  width: 55px;
`;

const SubTitle = styled.h3`
  font-family: 'Noto Sans';
`;

const TalbleDetailElement = (type: string, info: PlainTodo | PlainTodo[]): ReactElement => {
  return (
    <>
      <SubTitle>{TABLE_ROW_DETAIL_TYPE[type as keyof typeof TABLE_ROW_DETAIL_TYPE]}</SubTitle>
      {isPlainTodo(info) ? <Text text={info.content} margin="16px 0" /> : <TodoTitleList list={info} />}
    </>
  );
};

const ElapsedTimeText = (todo: PlainTodo): ReactElement => {
  const activeTodo = useAtomValue(asyncActiveTodo);
  const isWorking = useAtomValue(isOnProgress);
  return (
    <>
      {todo.id === activeTodo.id && isWorking === 'working' ? (
        <Text text="진행중..." margin="16px 0" color={red} />
      ) : (
        <Text text={getElapsedTimeText(todo.elapsedTime)} margin="16px 0" />
      )}
    </>
  );
};

const TableRowDetail = ({
  todo,
  prevTodoList,
  nextTodoList,
}: {
  todo: PlainTodo;
  prevTodoList: PlainTodo[];
  nextTodoList: PlainTodo[];
}): ReactElement => {
  return (
    <Wrapper>
      <BlankDiv />
      <DetailWrapper>
        <SubTitle>소요시간</SubTitle>
        {ElapsedTimeText(todo)}
        {todo.content !== '' && TalbleDetailElement('nowTodo', todo)}
        {prevTodoList.length > 0 && TalbleDetailElement('prevTodoList', prevTodoList)}
        {nextTodoList.length > 0 && TalbleDetailElement('nextTodoList', nextTodoList)}
      </DetailWrapper>
    </Wrapper>
  );
};
export default memo(TableRowDetail);
