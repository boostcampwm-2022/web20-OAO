import { useAtom, useSetAtom } from 'jotai';
import { POSTPONE_METHODS } from '@util/Constants.js';
import { todoList, elapsedTimeAtom, stopTimerAtom } from '@util/GlobalState.js';
import { toast } from 'react-toastify';

const usePostpone = (): any[] => {
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);
  const [elapsedTime] = useAtom(elapsedTimeAtom);
  const stopTimer = useSetAtom(stopTimerAtom);

  const setPostpone = (type: string): void => {
    stopTimer();
    todoListAtom
      .updateElapsedTime(elapsedTime)
      .then(async (updatedTodoList) => {
        return await POSTPONE_METHODS[type as keyof typeof POSTPONE_METHODS](updatedTodoList);
      })
      .then((newTodoList) => {
        setTodoListAtom(newTodoList);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return [setPostpone];
};

export default usePostpone;
