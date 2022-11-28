import { POSTPONE_METHODS, POSTPONE_TEXTS } from '@util/Constants';
import { useAtom } from 'jotai';
import { todoList } from '@util/GlobalState';
import { isEqualDate, TodoList } from '@core/todo/todoList.js';
import { useEffect, useState } from 'react';

const POSTPONE_OPTIONS = {
  '잠시 미루기': '잠시 미루기',
  '하루 미루기': '하루 미루기',
  '우선순위 낮추기': '우선순위 낮추기',
  '데드라인 미루기': '데드라인 미루기',
};

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
        console.error(err);
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

  // 1개밖에 없을 때 - 데드라인 미루기
  // getActiveTodo()가 없을 때 할 일 다함 (화면 예외처리 x)
  // activeTodo가 우선순위 1이면 조정 안 되게 해야 함
  const setPostpone = (elapsedTime: number, text: string): void => {
    todoListAtom
      .updateElapsedTime(elapsedTime)
      .then(async () => {
        console.log(1);
        return await POSTPONE_METHODS[text as keyof typeof POSTPONE_METHODS](todoListAtom);
      })
      .then(async (data: TodoList) => {
        console.log(11);
        const top = await data.getActiveTodo();
        return { top, data };
      })
      .then(({ data, top }) => {
        console.log(111);
        if (top.id !== activeTodo.id) {
          setTodoListAtom(data);
          alert('완료!'); // toast
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
    // POSTPONE_METHODS[text as keyof typeof POSTPONE_METHODS](todoListAtom, elapsedTime)
    //   .then((data: TodoList) => {
    //     data
    //       .getActiveTodo()
    //       .then((top) => {
    //         if (top.id !== activeTodo.id) {
    //           setTodoListAtom(data);
    //           alert('완료!'); // toast
    //         }
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //       });
    //   })
    //   .catch((err) => {
    //     throw new Error(err);
    //   });
  };
  return [setPostpone, activeTodo, postponeOptions];
};

export default useTodoList;
