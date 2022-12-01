import { useAtom } from 'jotai';
import { todoList, postponeClicked, isOnProgress, elasedTimeAtom } from '@util/GlobalState.js';
import useElapsedTime from './useElapsedTime.js';
import useActiveTodo from './useActiveTodo.js';
import usePostpone from './usePostpone';
import useDone from './useDone.js';
import useButtonConfig from './useButtonConfig.js';

const useTodoList = (): any => {
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);
  const [activeTodo, setActiveTodo] = useActiveTodo();
  const [postpone] = useAtom(postponeClicked);
  const [postponeOptions, setPostpone] = usePostpone(todoListAtom, setTodoListAtom, activeTodo);
  const [displayTime, startTimer, stopTimer, elapsedTime, setElapsedTime] = useElapsedTime(activeTodo);
  const [setDone] = useDone(activeTodo, setActiveTodo, elapsedTime, setElapsedTime);
  const [userState] = useAtom(isOnProgress);
  const [buttonConfig, handleOnToggle] = useButtonConfig(userState, startTimer, stopTimer);
  // const [time] = useAtom(elasedTimeAtom);

  // const beforeMovePage = (): void => {
  //   stopTimer();
  //   handleOnToggle();
  //   todoListAtom
  //     .updateElapsedTime(time)
  //     .then((newTodoList) => {
  //       setTodoListAtom(newTodoList);
  //     })
  //     .catch((err) => {
  //       throw new Error(err.message);
  //     });
  // };

  return {
    setPostpone,
    postpone,
    activeTodo,
    postponeOptions,
    elapsedTime,
    setElapsedTime,
    setDone,
    displayTime,
    buttonConfig,
    handleOnToggle,
    beforeMovePage,
    stopTimer,
  };
};

export default useTodoList;
