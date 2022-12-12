import { useAtom, useSetAtom } from 'jotai';
import { toast } from 'react-toastify';

import { POSTPONE_METHODS } from '@util/Constants.js';
import { useGlobalAtom } from '@util/GlobalAtomContext';

const usePostpone = (): any[] => {
  const { todoList, elapsedTimeAtom, stopTimerAtom, postponeClicked } = useGlobalAtom();
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);
  const [elapsedTime, setElapsedTime] = useAtom(elapsedTimeAtom);
  const stopTimer = useSetAtom(stopTimerAtom);
  const setPostponeClicked = useSetAtom(postponeClicked);

  const setPostpone = (type: string): void => {
    stopTimer();
    todoListAtom
      .updateElapsedTime(elapsedTime)
      .then(async (updatedTodoList) => {
        return await POSTPONE_METHODS[type as keyof typeof POSTPONE_METHODS](updatedTodoList);
      })
      .then(async (newTodoList) => {
        setTodoListAtom(newTodoList);
        return await newTodoList.getActiveTodo();
      })
      .then((newActiveTodo) => {
        setPostponeClicked(false);
        setElapsedTime(newActiveTodo !== undefined ? newActiveTodo.elapsedTime : 0);
        toast.error('오늘도 할 일을 미룬 당신! 혹시 말로만 하는 사람은 아니겠죠? 🤔');
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return [setPostpone];
};

export default usePostpone;
