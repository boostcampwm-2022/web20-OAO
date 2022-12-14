import { atom } from 'jotai';
import { createTodoList } from '@todo/todoList.js';
import { POSTPONE_TEXTS, POSTPONE_OPTIONS } from '@util/Constants.js';
import { isEqualDate } from '@todo/todo.util';
import { getElapsedTimeText } from './Common';

export const loginStateAtom = atom(true);
export const isOnProgress = atom('relaxing');

export const readWriteAtom = atom(
  (get) => get(loginStateAtom),
  (_get, set, newValue: boolean) => set(loginStateAtom, newValue),
);

let todoData = await createTodoList('IndexedDB');
let tutorialTodoData = await createTodoList('MemoryDB');
export const todoList = atom(todoData);
export const isTutorialAtom = atom(false);

export const changeIndexedDBtoMemoryAtom = atom(null, (get, set) => {
  if (!get(isTutorialAtom)) {
    return;
  }

  todoData = get(todoList).clone();
  set(todoList, tutorialTodoData);
});

export const changeMemorytoIndexedDBAtom = atom(null, (get, set) => {
  if (get(isTutorialAtom)) {
    return;
  }
  tutorialTodoData = get(todoList).clone();
  set(todoList, todoData);
});

export const asyncActiveTodo = atom(
  async (get) => await get(todoList).getActiveTodo(),
  async (get, set, newValue) => {
    get(todoList)
      .getActiveTodo()
      .then(async (newActiveTodo) => {
        return await set(asyncActiveTodo, newActiveTodo);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
);

export const elapsedTimeAtom = atom(0); // 초 단위 경과시간

export const postponeClicked = atom(false);
export const isFinishedAtom = atom(false);

export const postpone = atom(['']);

export const postponeOptionsAtom = atom(
  (get) => get(postpone),
  (get, set, newValue) => {
    const activeTodo = get(asyncActiveTodo);
    if (activeTodo === undefined) {
      return set(postpone, []);
    }
    set(
      postpone,
      POSTPONE_TEXTS.filter((x) => {
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
      }),
    );
  },
);

export const globalTimerAtom = atom(-1);

export const setTimerAtom = atom(
  (get) => get(globalTimerAtom),
  (get, set) => {
    const timer = get(globalTimerAtom);
    if (timer === -1) {
      set(
        globalTimerAtom,
        window.setInterval(() => {
          set(elapsedTimeAtom, get(elapsedTimeAtom) + 1);
        }, 1000),
      );
      set(isOnProgress, 'working'); // start
      return;
    }

    clearInterval(timer);
    set(globalTimerAtom, -1);
    set(isOnProgress, 'relaxing'); // stop
  },
);

export const stopTimerAtom = atom(null, (get, set) => {
  const timer = get(globalTimerAtom);
  if (timer !== -1) {
    clearInterval(timer);
    set(globalTimerAtom, -1);
    set(isOnProgress, 'relaxing'); // stop
  }
});

export const displayTime = atom('');
export const displayTimeAtom = atom(
  (get) => get(displayTime),
  (get, set) => {
    const time = get(elapsedTimeAtom);
    set(displayTime, `소요시간: ${getElapsedTimeText(time)}`);
  },
);

export const isMainPage = atom(true);
export const isMainPageAtom = atom(
  (get) => get(isMainPage),
  (_get, set) => {
    set(isMainPage, location.pathname === '/' || location.pathname === '/tutorials/');
  },
);

export const needTodoController = atom(true);
export const needTodoControllerAtom = atom(
  (get) => get(needTodoController),
  (get, set) => {
    set(needTodoController, !get(isMainPage) && get(asyncActiveTodo) !== undefined);
  },
);
