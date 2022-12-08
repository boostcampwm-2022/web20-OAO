import { ReactElement, useEffect, useState } from 'react';
import SearchBar from '@components/SearchBar';
import { PlainTodo } from '@todo/todo.type';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';
import Button from '@components/Button';
import Cancel from '@images/Cancel.svg';
import { modalTypeAtom, todoList, editingTodoIdAtom } from '@util/GlobalState';
import { useAtomValue, useAtom } from 'jotai';
import { toast } from 'react-toastify';

const { lightestGray, blue } = PRIMARY_COLORS;

const RelatedTodoInputList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  display: flex;
  width: fit-content;
  border-radius: 10px;
  position: relative;
  padding-left: 5px;
  margin: 5px;
  background-color: ${lightestGray};
  button {
    background: none;
    margin-right: 5px;
  }
`;

const RelatedTodoInput = ({ relatedType }: { relatedType: string }): ReactElement => {
  const [relatedTodoList, setRelatedTodoList] = useState<PlainTodo[]>([]);
  const todoListAtom = useAtomValue(todoList);
  const [editingTodoId] = useAtom(editingTodoIdAtom);
  const modalType = useAtomValue(modalTypeAtom);

  useEffect(() => {
    if (modalType === 'create') return setRelatedTodoList(() => []);
    todoListAtom
      .getTodoById(editingTodoId)
      .then((todo) => {
        if (todo === undefined) return;
        if (relatedType === 'prev') {
          todoListAtom
            .getTodoByIdList(todo.prev)
            .then((prevTodoList) => setRelatedTodoList(() => [...prevTodoList]))
            .catch((err) => toast.error(err));
        }
        if (relatedType === 'next') {
          todoListAtom
            .getTodoByIdList(todo.next)
            .then((nextTodoList) => setRelatedTodoList(() => [...nextTodoList]))
            .catch((err) => toast.error(err));
        }
      })
      .catch((err) => toast.error(err));
  }, [editingTodoId, modalTypeAtom]);

  const onClick = (todo: PlainTodo): void => {
    const isTodoAlreadyexist =
      relatedTodoList.filter((relatedTodo: PlainTodo) => relatedTodo.id === todo.id).length > 0;
    isTodoAlreadyexist ? toast.error('😅 이미 존재하는 할 일 입니다') : setRelatedTodoList((prev) => [...prev, todo]);
  };

  const deleteRelatedToto = (todoId: string): void => {
    const newRelatedTodoList = relatedTodoList.filter((el: PlainTodo) => el.id !== todoId);
    setRelatedTodoList(() => [...newRelatedTodoList]);
  };
  const getTodoInputWidth = (title: string): string => {
    return `${title.length > 10 ? 150 : title.length * 15 + 10}` + 'px';
  };

  return (
    <div>
      <SearchBar onClick={onClick} />
      <RelatedTodoInputList>
        {relatedTodoList.map((relatedTodo: PlainTodo) => {
          return (
            <InputWrapper key={relatedTodo.id}>
              <input
                type="text"
                id={relatedTodo.id}
                value={relatedTodo.title}
                data-label={relatedType}
                style={{
                  width: getTodoInputWidth(relatedTodo.title),
                  textOverflow: 'ellipsis',
                  color: blue,
                  background: 'none',
                  border: 'none',
                }}
                readOnly
              />
              <Button
                context={<img src={Cancel} width="20px" height="20px" />}
                onClick={() => deleteRelatedToto(relatedTodo.id)}
              />
            </InputWrapper>
          );
        })}
      </RelatedTodoInputList>
    </div>
  );
};

export default RelatedTodoInput;
