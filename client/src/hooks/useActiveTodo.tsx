import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { todoList } from '@util/GlobalState.js';
import { INITIAL_TODO } from '@util/Constants.js';

const useActiveTodo = (): any[] => {
  const [todoListAtom] = useAtom(todoList);
  const [activeTodo, setActiveTodo] = useState(INITIAL_TODO);

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

  return [activeTodo, setActiveTodo];
};

export default useActiveTodo;
