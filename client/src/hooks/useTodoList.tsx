import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { isEqualDate, TodoList } from '@core/todo/todoList.js';

import { POSTPONE_METHODS, POSTPONE_TEXTS, POSTPONE_OPTIONS } from '@util/Constants';
import { todoList } from '@util/GlobalState.js';

const useTodoList = (): any[] => {
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);
  const [activeTodo, setActiveTodo] = useState({ id: undefined, importance: 1, until: new Date() });
  const [postponeOptions, setPostponeOptions] = useState(POSTPONE_TEXTS);

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
    if (activeTodo.until === undefined) {
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
        setActiveTodo(top);
        alert('완료!'); // toast
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
  return [setPostpone, activeTodo, postponeOptions];
};

export default useTodoList;
