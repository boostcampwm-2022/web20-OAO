import { useSetAtom, useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { stopTimerAtom, todoList, elapsedTimeAtom, postponeClicked } from '@util/GlobalState.js';

const useDone = (): any[] => {
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);
  const [elapsedTime, setElapsedTime] = useAtom(elapsedTimeAtom);
  const setPostponeClicked = useSetAtom(postponeClicked);
  const stopTimer = useSetAtom(stopTimerAtom);

  const setDone = (): void => {
    stopTimer();
    todoListAtom
      .updateElapsedTime(elapsedTime)
      .then(async (updatedTodoList) => {
        return await updatedTodoList.setDone();
      })
      .then(async (newTodoList) => {
        setTodoListAtom(newTodoList);
        return await newTodoList.getActiveTodo();
      })
      .then((newActiveTodo) => {
        setPostponeClicked(false);
        setElapsedTime(newActiveTodo !== undefined ? newActiveTodo.elapsedTime : 0);
        toast.success('완료되었습니다! 👏🏻👏🏻👏🏻');
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return [setDone];
};
export default useDone;
