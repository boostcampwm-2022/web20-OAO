import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { todoList } from '@util/GlobalState';
import { PRIMARY_COLORS } from '@util/Constants';
import { PlainTodo } from '@todo/todo.type';

import Button from '@components/Button';
import Search from '@components/Search';

import Cancel from '@images/Cancel.svg';

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
  input {
    text-overflow: ellipsis;
    background: none;
  }
`;

const RelatedTodoInput = ({
  relatedType,
  editingTodoId,
  onChange,
}: {
  relatedType: string;
  editingTodoId?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}): ReactElement => {
  const todoListAtom = useAtomValue(todoList);
  const [relatedTodoList, setRelatedTodoList] = useState<PlainTodo[]>([]);

  const getTodoListByIdList = async (idList: string[]): Promise<PlainTodo[]> => {
    return await todoListAtom.getTodoByIdList(idList).then((todoList) => todoList);
  };

  const getRelatedTodoByIdAndType = async (id: string, type: string): Promise<string[] | null> => {
    return await todoListAtom
      .getTodoById(id)
      .then((todo) => (todo !== undefined ? (type === 'prev' ? todo.prev : todo.next) : null));
  };

  useEffect(() => {
    const getRelatedTodoList = async (): Promise<void> => {
      if (editingTodoId === undefined) return setRelatedTodoList(() => []);

      const relatedTodoIdList = await getRelatedTodoByIdAndType(editingTodoId, relatedType);
      const relatedTodoList = relatedTodoIdList !== null ? await getTodoListByIdList(relatedTodoIdList) : [];
      if (relatedTodoList.length > 0) setRelatedTodoList(() => [...relatedTodoList]);
    };

    getRelatedTodoList().catch((err) => toast.error(err));
  }, [editingTodoId]);

  const onClick = (todo: PlainTodo): void => {
    const isTodoAlreadyexist =
      relatedTodoList.filter((relatedTodo: PlainTodo) => relatedTodo.id === todo.id).length > 0;
    isTodoAlreadyexist ? toast.error('😅 이미 존재하는 할 일 입니다') : setRelatedTodoList((prev) => [...prev, todo]);
  };

  const deleteRelatedToto = (todoId: string): void => {
    const newRelatedTodoList = relatedTodoList.filter((el: PlainTodo) => el.id !== todoId);
    setRelatedTodoList(() => [...newRelatedTodoList]);
  };

  return (
    <div>
      <Search onClick={onClick} onChange={onChange} />
      <RelatedTodoInputList>
        {relatedTodoList.map((relatedTodo: PlainTodo) => {
          return (
            <InputWrapper key={relatedTodo.id}>
              <input
                type="text"
                data-id={relatedTodo.id}
                value={relatedTodo.title}
                data-label={relatedType}
                style={{
                  color: blue,
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
