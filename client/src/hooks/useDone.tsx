import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { todoList } from '@util/GlobalState.js';

const useDone = (): any[] => {
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);

  const setDone = (elasedTime: number): void => {
    todoListAtom
      .updateElapsedTime(elasedTime)
      .then(async (data) => {
        return await data.setDone();
      })
      .then((newTodoList) => {
        toast.success('완료 👏🏻👏🏻'); // toast
        setTodoListAtom(newTodoList);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return [setDone];
};

export default useDone;
