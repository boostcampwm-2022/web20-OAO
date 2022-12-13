import { ReactElement, MouseEventHandler, CSSProperties, Dispatch, SetStateAction, memo } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { PlainTodo } from '@todo/todo.type';
import { PRIMARY_COLORS, TODO_STATE_TEXT, IMPORTANCE_ALPHABET } from '@util/Constants';
import { copyToClipboard, gethhmmFormat, getyyyymmddDateFormat } from '@util/Common';
import { todoList, editingTodoIdAtom } from '@util/GlobalState';

import Button from '@components/Button';
import Image from '@components/Image';
import Unchecked from '@images/Unchecked.svg';
import Checked from '@images/Checked.svg';
import Delete from '@images/Delete.svg';
import Update from '@images/Update.svg';
import Copy from '@images/Copy.svg';
import { getListInfoText } from '@util/todos.util';

const { lightGray } = PRIMARY_COLORS;

interface HeaderElementData {
  todo: PlainTodo;
  prevTodoList: PlainTodo[];
  nextTodoList: PlainTodo[];
}

interface HeaderElem {
  type: string;
  style: CSSProperties;
  value: string;
}

interface DetailCssStyle {
  text: CSSProperties;
  title: CSSProperties;
  content: CSSProperties;
  null: CSSProperties;
}

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3fr 1fr 2fr 1fr 2fr 2fr 2fr;
  border-bottom: 2px solid ${lightGray};
  text-align: center;
  position: sticky;
  top: 0;
  background-color: white;
  p {
    margin: 10px 0;
  }
`;

const TABLE_ROW_DETAIL_STYLES: DetailCssStyle = {
  text: { overflow: 'hidden', whiteSpace: 'nowrap' },
  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginRight: '10px',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    fontWeight: 700,
  },
  content: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    margin: '0 10px',
  },
  null: {},
};

const createHeaderElementData = ({ todo, prevTodoList, nextTodoList }: HeaderElementData): HeaderElem[] => {
  return [
    {
      type: 'title',
      style: TABLE_ROW_DETAIL_STYLES.title,
      value: todo.title,
    },
    {
      type: 'state',
      style: TABLE_ROW_DETAIL_STYLES.text,
      value: TODO_STATE_TEXT[todo.state],
    },
    {
      type: 'until',
      style: TABLE_ROW_DETAIL_STYLES.text,
      value: `${getyyyymmddDateFormat(todo.until, '.')} ${gethhmmFormat(todo.until)}`,
    },
    {
      type: 'importance',
      style: TABLE_ROW_DETAIL_STYLES.null,
      value: IMPORTANCE_ALPHABET[todo.importance],
    },
    {
      type: 'prev',
      style: TABLE_ROW_DETAIL_STYLES.content,
      value: getListInfoText(prevTodoList),
    },
    {
      type: 'next',
      style: TABLE_ROW_DETAIL_STYLES.content,
      value: getListInfoText(nextTodoList),
    },
  ];
};

const TableRowHeader = ({
  todo,
  prevTodoList,
  nextTodoList,
  onClick,
  setHasEditModal,
}: {
  todo: PlainTodo;
  prevTodoList: PlainTodo[];
  nextTodoList: PlainTodo[];
  onClick: MouseEventHandler;
  setHasEditModal: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
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

  const tableRowHeaderElemList = createHeaderElementData({ todo, prevTodoList, nextTodoList });

  return (
    <Wrapper onClick={onClick}>
      <Button context={<Image src={todo.state === 'DONE' ? Checked : Unchecked} />} onClick={checkTodoStateHandler} />
      {tableRowHeaderElemList.map((headerElem) => {
        return (
          <div key={headerElem.type} style={headerElem.style}>
            {headerElem.value}
          </div>
        );
      })}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          context={<img src={Update} width="40px" height="40px" alt="update" />}
          onClick={() => {
            setEditingTodoId(todo.id);
            setHasEditModal(true);
          }}
        />
        <Button
          context={<img src={Delete} width="40px" height="40px" alt="delete" />}
          onClick={() => {
            handleOnDelete(todo.id);
          }}
        />
        <Button
          context={<img src={Copy} width="40px" height="40px" alt="copy" title={'제목 복사하기'} />}
          onClick={() => {
            copyToClipboard(todo.title);
          }}
        />
      </div>
    </Wrapper>
  );
};

export default memo(TableRowHeader);
