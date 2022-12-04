import { ReactElement } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import { TODO_STATE_TEXT, IMPORTANCE_ALPHABET, TABLE_MODALS } from '@util/Constants';
import { getyyyymmddDateFormat, gethhmmFormat, copyToClipboard } from '@util/Common';

import Button from '@components/Button';
import Image from '@components/Image';
import Unchecked from '@images/Unchecked.svg';
import Checked from '@images/Checked.svg';
import Delete from '@images/Delete.svg';
import Update from '@images/Update.svg';
import Copy from '@images/Copy.svg';

import { PlainTodo } from '@todo/todo.type';

import { modalTypeAtom, todoList, editingTodoIdAtom } from '@util/GlobalState';
import { toast } from 'react-toastify';

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
  onClick,
}: {
  todo: PlainTodo;
  prevTodoTitle: string;
  nextTodoTitle: string;
  onClick: React.MouseEventHandler<HTMLTableRowElement>;
}): ReactElement => {
  const [, setModalType] = useAtom(modalTypeAtom);
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);
  const [, setEditingTodoId] = useAtom(editingTodoIdAtom);

  const checkTodoStateHandler = (): void => {
    // API에서 알고리즘으로 todo state를 배정해주므로 DONE일 때는 임의로 WAIT으로 바꿔 전송 : WAIT/READY 상관없음

    let newTodo = {};
    newTodo = { ...todo, state: todo.state === 'DONE' ? 'WAIT' : 'DONE' };
    todoListAtom
      .edit(todo.id, newTodo)
      .then((newTodoList) => {
        setTodoListAtom(newTodoList);
        toast.success('완료되었습니다.');
      })
      .catch((err) => toast.error(err));
  };

  const handleOnDelete = (todoId: string): void => {
    todoListAtom
      .remove(todoId)
      .then((data) => {
        setTodoListAtom(data);
      })
      .catch((err: any) => {
        toast.error(err.message);
      });
  };

  return (
    <tr onClick={onClick}>
      <td>
        {todo.state === 'DONE' ? (
          <Button context={<Image src={Checked} />} onClick={checkTodoStateHandler} />
        ) : (
          <Button context={<Image src={Unchecked} />} onClick={checkTodoStateHandler} />
        )}
      </td>
      <td>
        <TitleWrapper>{todo.title}</TitleWrapper>
      </td>
      <td>
        <TextWrapper>{TODO_STATE_TEXT[todo.state]}</TextWrapper>
      </td>
      <td>
        <TextWrapper>
          {getyyyymmddDateFormat(todo.until, '.')} {gethhmmFormat(todo.until)}
        </TextWrapper>
      </td>
      <td>{IMPORTANCE_ALPHABET[todo.importance]}</td>
      <td>
        <ContentWrapper>{getListInfoText(todo.prev, prevTodoTitle)}</ContentWrapper>
      </td>
      <td>
        <ContentWrapper>{getListInfoText(todo.next, nextTodoTitle)}</ContentWrapper>
      </td>
      <td>
        <Button
          context={<img src={Update} />}
          onClick={(e) => {
            setEditingTodoId(todo.id);
            setModalType(TABLE_MODALS.update);
          }}
        />
        <Button
          context={<img src={Delete} />}
          onClick={(e) => {
            handleOnDelete(todo.id);
          }}
        />
        <Button
          context={<img src={Copy} />}
          onClick={(e) => {
            copyToClipboard(todo.id);
          }}
        />
      </td>
    </tr>
  );
};

export default TableRowHeader;
