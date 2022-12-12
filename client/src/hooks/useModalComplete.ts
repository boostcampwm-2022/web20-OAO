import { InputTodo } from '@todo/todo.type';
import { TodoList } from '@todo/todoList';
import { MAX_DATE } from '@util/Constants';
import { editingTodoIdAtom, todoList } from '@util/GlobalState';
import { validateUuid } from '@util/modal.util';
import { useAtom } from 'jotai';
import { Dispatch, SetStateAction } from 'react';

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

interface ModalValues {
  id: string;
  value: string;
  dataset: { label: string; id: string };
}

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
  const [editingTodoId] = useAtom(editingTodoIdAtom);
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);

  const setComplete = async (inputData: any[], setHasModal: Dispatch<SetStateAction<boolean>>): Promise<void> => {
    try {
      let newData = {};
      const prevTodoIdList: string[] = [];
      const nextTodoIdList: string[] = [];
      inputData.forEach((item) => {
        const { id, value, dataset }: ModalValues = item;

        if (id === 'title' && value === '') {
          throw new Error('제목은 필수 값입니다!');
        }
        if (id === 'until') {
          if (new Date(value) > new Date(MAX_DATE)) {
            throw new Error('날짜는 2999-12-30 이후로 설정할 수 없습니다.');
          }
          return (newData = { ...newData, [id]: new Date(value) });
        }

        if (dataset.label === 'prev' || dataset.label === 'next') {
          if (dataset.id === editingTodoId)
            throw new Error('수정하고 있는 할 일은 먼저 할 일과 나중에 할 일에 들어갈 수 없습니다');
          validateUuid(dataset.id);

          return dataset.label === 'prev' ? prevTodoIdList.push(dataset.id) : nextTodoIdList.push(dataset.id);
        }
        newData = { ...newData, [id]: value };
      });
      newData = { ...newData, prev: prevTodoIdList, next: nextTodoIdList };

      const data = await MODAL_COMPLETE_ACTIONS[type as keyof typeof MODAL_COMPLETE_ACTIONS](
        todoListAtom,
        newData,
        editingTodoId,
      );
      setTodoListAtom(data);
      setHasModal(false);
      toast.success(COMPLETE_MESSAGE[type as keyof typeof COMPLETE_MESSAGE]);
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return [setComplete];
};
export default useModalComplete;
