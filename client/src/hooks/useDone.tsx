import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
// import { useState } from 'react';

import { todoList } from '@util/GlobalState.js';

// import useElapsedTime from './useElapsedTime.js';
import { PlainTodo } from '@todo/todo.type';

const useDone = (activeTodo: PlainTodo, setActiveTodo: Function, time: number, setTime: Function): any[] => {
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);

  const setDone = (elasedTime: number): void => {
    todoListAtom
      .updateElapsedTime(time + elasedTime)
      .then(async (data) => {
        return await data.setDone();
      })
      .then(async (newTodoList) => {
        setTodoListAtom(() => newTodoList);
        return await newTodoList.getActiveTodo();
      })
      .then((newActiveTodo) => {
        setActiveTodo(newActiveTodo);
        toast.success('완료 👏🏻👏🏻'); // toast
        setTime(newActiveTodo !== undefined ? newActiveTodo.elapsedTime : 0);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return [setDone];
};

export default useDone;
