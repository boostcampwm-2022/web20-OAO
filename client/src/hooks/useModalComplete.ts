import { useAtom, useAtomValue } from 'jotai';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { InputTodo } from '@todo/todo.type';
import { TodoList } from '@todo/todoList';

import { elapsedTimeAtom, todoList } from '@util/GlobalState';
import { getCheckedInputData } from '@util/modal.util';

import 'react-toastify/dist/ReactToastify.css';

const MODAL_COMPLETE_ACTIONS = {
  create: async (todoList: TodoList, newData: InputTodo) => {
    return await todoList.add(newData);
  },
  update: async (todoList: TodoList, newData: InputTodo, id: string) => {
    return await todoList.edit(id, newData);
  },
};

const COMPLETE_MESSAGE = {
  create: '새로운 Todo가 추가되었습니다. 😎',
  update: 'Todo가 수정되었습니다. ☘️',
};

const useModalComplete = (type: string): any[] => {
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);
  const elapsedTime = useAtomValue(elapsedTimeAtom);

  const setComplete = async (
    inputData: any[],
    setHasModal: Dispatch<SetStateAction<boolean>>,
    editingTodoId: string,
  ): Promise<void> => {
    todoListAtom
      .updateElapsedTime(elapsedTime)
      .then((newTodoList) => {
        return newTodoList;
      })
      .then(async (newTodoList) => {
        return await MODAL_COMPLETE_ACTIONS[type as keyof typeof MODAL_COMPLETE_ACTIONS](
          newTodoList,
          getCheckedInputData(type, inputData),
          editingTodoId,
        );
      })
      .then((data) => {
        setTodoListAtom(data);
        setHasModal(false);
        toast.success(COMPLETE_MESSAGE[type as keyof typeof COMPLETE_MESSAGE]);
      })
      .catch((err: any) => {
        toast.error(err.message);
      });
  };
  return [setComplete];
};
export default useModalComplete;
