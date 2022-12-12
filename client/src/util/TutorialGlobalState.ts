import { atom } from 'jotai';
import { createTodoList } from '@todo/todoList.js';
import { TABLE_MODALS, POSTPONE_TEXTS, POSTPONE_OPTIONS } from '@util/Constants.js';
import { isEqualDate } from '@todo/todo.util';

const isOnProgress = atom('relaxing');

const todoData = await createTodoList('MemoryDB');
const todoList = atom(todoData);

const asyncActiveTodo = atom(
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

const elapsedTimeAtom = atom(0); // 초 단위 경과시간

const postponeClicked = atom(false);
const isFinishedAtom = atom(false);

const modalTypeAtom = atom(TABLE_MODALS.none);
const editingTodoIdAtom = atom('');

const postpone = atom(['']);

const postponeOptionsAtom = atom(
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

const globalTimerAtom = atom(-1);

const setTimerAtom = atom(
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

const stopTimerAtom = atom(null, (get, set) => {
  const timer = get(globalTimerAtom);
  if (timer !== -1) {
    clearInterval(timer);
    set(globalTimerAtom, -1);
    set(isOnProgress, 'relaxing'); // stop
  }
});

const displayTime = atom('');
const displayTimeAtom = atom(
  (get) => get(displayTime),
  (get, set) => {
    const time = get(elapsedTimeAtom);
    const hour = Math.floor(time / 60 / 60);
    const minute = Math.floor((time % 3600) / 60);
    const second = time % 60;

    set(displayTime, `소요시간: ${hour}h ${minute}m ${second}s`);
  },
);

const isMainPage = atom(true);
const isMainPageAtom = atom(
  (get) => get(isMainPage),
  (_get, set) => {
    set(isMainPage, location.pathname === '/' || location.pathname === '/tutorials');
  },
);

const needTodoController = atom(true);
const needTodoControllerAtom = atom(
  (get) => get(needTodoController),
  (get, set) => {
    set(needTodoController, !get(isMainPage) && get(asyncActiveTodo) !== undefined);
  },
);

export const tutorialGlobalAtom = {
  isOnProgress,
  todoList,
  asyncActiveTodo,
  elapsedTimeAtom,
  postponeClicked,
  isFinishedAtom,
  modalTypeAtom,
  editingTodoIdAtom,
  postpone,
  postponeOptionsAtom,
  globalTimerAtom,
  setTimerAtom,
  stopTimerAtom,
  displayTime,
  displayTimeAtom,
  isMainPage,
  isMainPageAtom,
  needTodoController,
  needTodoControllerAtom,
};
