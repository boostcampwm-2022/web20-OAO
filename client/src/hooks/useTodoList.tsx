import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { TodoList } from '@core/todo/todoList.js';
import { isEqualDate } from '@todo/todo.util';

import { POSTPONE_METHODS, POSTPONE_TEXTS, POSTPONE_OPTIONS, INITIAL_TODO } from '@util/Constants';
import { isFinishedAtom, todoList } from '@util/GlobalState.js';

const useTodoList = (): any[] => {
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);
  const [activeTodo, setActiveTodo] = useState(INITIAL_TODO);
  const [postponeOptions, setPostponeOptions] = useState(POSTPONE_TEXTS);
  const [, setIsFinished] = useAtom(isFinishedAtom);

  useEffect(() => {
    todoListAtom
      .getActiveTodo()
      .then((top: any) => {
        setActiveTodo(top);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [todoListAtom]);

  useEffect(() => {
    if (activeTodo === undefined) {
      return;
    }
    setPostponeOptions(() => {
      return POSTPONE_TEXTS.filter((x) => {
        if (activeTodo.importance <= 1 && x === POSTPONE_OPTIONS['우선순위 낮추기']) {
          return false;
        }
        if (isEqualDate(new Date(), activeTodo.until) && x === POSTPONE_OPTIONS['하루 미루기']) {
          return false;
        }
        if (!isEqualDate(new Date(), activeTodo.until) && x === POSTPONE_OPTIONS['데드라인 미루기']) {
          return false;
        }
        return true;
      });
    });
  }, [activeTodo]);

  const setPostpone = (elapsedTime: number, text: string): void => {
    todoListAtom
      .updateElapsedTime(elapsedTime)
      .then(async () => {
        return await POSTPONE_METHODS[text as keyof typeof POSTPONE_METHODS](todoListAtom);
      })
      .then(async (data: TodoList) => {
        const top = await data.getActiveTodo();
        return { top, data };
      })
      .then(({ data, top }) => {
        setTodoListAtom(data);
        setActiveTodo(INITIAL_TODO);
        setIsFinished(top === undefined);
        toast.error('오늘도 미루는 나, 혹시 아가리로만 하고 계시진 않으신가요? 🤔'); // toast
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
  return [setPostpone, activeTodo, postponeOptions];
};

export default useTodoList;
