import { PlainTodo } from '@core/todo/todoList';
import { ReactElement, useState } from 'react';
import { TODO_STATE_TEXT, IMPORTANCE_ALPHABET, TABLE_MODALS } from '@util/Constants';
import { getyyyymmddDateFormat, gethhmmFormat } from '@util/Common';

import Button from '@components/Button';
import Image from '@components/Image';
import Unchecked from '@images/Unchecked.svg';
import Checked from '@images/Checked.svg';
import Delete from '@images/Delete.svg';
import Update from '@images/Update.svg';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import { modalTypeAtom } from '@util/GlobalState';

const CheckWrapper = styled.div`
  input {
    display: none;
  }
  img {
    cursor: pointer;
  }
`;

const TextWrapper = styled.div`
  overflow: hidden;
  white-space: nowrap;
`;

const TitleWrapper = styled(TextWrapper)`
  margin-right: 10px;
  text-overflow: ellipsis;
  text-align: left;
  font-weight: 700;
`;

const ContentWrapper = styled(TextWrapper)`
  margin: 0 10px;
`;

const getListInfoText = (list: string[], firstTodoTitle: string | undefined): string => {
  if (firstTodoTitle === undefined) return '-';
  if (list.length > 1) {
    return firstTodoTitle.length > 10
      ? [firstTodoTitle.slice(0, 10), '... 외 ', list.length - 1].join('')
      : [firstTodoTitle, '외', list.length - 1].join(' ');
  } else if (list.length === 1) {
    return firstTodoTitle.length > 12 ? [firstTodoTitle.slice(0, 12), '...'].join('') : firstTodoTitle;
  }
  return '-';
};

const TableRowHeader = ({
  todo,
  prevTodoTitle,
  nextTodoTitle,
}: {
  todo: PlainTodo;
  prevTodoTitle: string;
  nextTodoTitle: string;
}): ReactElement => {
  const [isTodoDone, setIsTodoDone] = useState(false);
  const [, setModalType] = useAtom(modalTypeAtom);

  const checkTodoStateHandler = (): void => {
    setIsTodoDone(!isTodoDone);
  };

  return (
    <>
      <CheckWrapper>
        <input type="checkBox" id="todoDone" readOnly={isTodoDone} onClick={checkTodoStateHandler} />
        <label htmlFor="todoDone">{isTodoDone ? <Image src={Checked} /> : <Image src={Unchecked} />}</label>
      </CheckWrapper>
      <TitleWrapper>{todo.title}</TitleWrapper>
      <TextWrapper>{TODO_STATE_TEXT[todo.state]}</TextWrapper>
      <TextWrapper>
        {getyyyymmddDateFormat(todo.until, '.')} {gethhmmFormat(todo.until)}
      </TextWrapper>
      <div>{IMPORTANCE_ALPHABET[todo.importance]}</div>
      <ContentWrapper>{getListInfoText(todo.prev, prevTodoTitle)}</ContentWrapper>
      <ContentWrapper>{getListInfoText(todo.next, nextTodoTitle)}</ContentWrapper>
      <div>
        <Button context={<img src={Update} />} onClick={(e) => setModalType(TABLE_MODALS.update)} />
        <Button context={<img src={Delete} />} />
      </div>
    </>
  );
};

export default TableRowHeader;
