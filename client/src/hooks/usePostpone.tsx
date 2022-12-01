import { POSTPONE_METHODS, POSTPONE_OPTIONS, POSTPONE_TEXTS } from '@util/Constants';
import { PlainTodo } from '@todo/todo.type';
import { TodoList } from '@todo/todoList';
import { isFinishedAtom, elasedTimeAtom } from '@util/GlobalState.js';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { isEqualDate } from '@todo/todo.util';
import { toast } from 'react-toastify';

const usePostpone = (todoListAtom: TodoList, setTodoListAtom: Function, activeTodo: PlainTodo): any[] => {
  const [postponeOptions, setPostponeOptions] = useState(POSTPONE_TEXTS);
  const [, setIsFinished] = useAtom(isFinishedAtom);
  const [time, setTime] = useAtom(elasedTimeAtom); // time: 초 단위

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

  const setPostpone = (text: string): void => {
    todoListAtom
      .updateElapsedTime(time)
      .then(async () => {
        return await POSTPONE_METHODS[text as keyof typeof POSTPONE_METHODS](todoListAtom);
      })
      .then(async (data: TodoList) => {
        const top = await data.getActiveTodo();
        return { top, data };
      })
      .then(({ data, top }) => {
        setTodoListAtom(data);
        setIsFinished(top === undefined);
        setTime(top.elapsedTime);
        toast.error('오늘도 미루는 나, 혹시 아가리로만 하고 계시진 않으신가요? 🤔'); // toast
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
  return [postponeOptions, setPostpone];
};

export default usePostpone;
