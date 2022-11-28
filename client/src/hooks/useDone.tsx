import { useAtom } from 'jotai';
import { todoList } from '@util/GlobalState';

const useDone = (): any[] => {
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);

  const setDone = (elasedTime: number): void => {
    todoListAtom
      .updateElapsedTime(elasedTime)
      .then((data) => {
        console.log(data);
        data
          .setDone()
          .then((newTodoList) => {
            console.log(newTodoList);
            setTodoListAtom(newTodoList);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return [setDone];
};

export default useDone;
