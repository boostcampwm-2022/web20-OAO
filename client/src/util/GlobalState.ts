import { atom } from 'jotai';
import { createTodoList } from '@todo/todoList.js';
import { TABLE_MODALS, POSTPONE_TEXTS, POSTPONE_OPTIONS } from '@util/Constants.js';
import { isEqualDate } from '@todo/todo.util';

// import { Todo } from '@core/todo/todoList.js';

// import sortRawTestCase from '../core/todo/test/sort.data.json';

// const sortTestCase = sortRawTestCase.map((el) => ({
//   tag: el.tag,
//   today: new Date(el.today),
//   data: el.data.map((todo) =>
//     new Todo({ ...todo, owner: 'default owner', state: 'READY', importance: todo.importance as number }).toPlain(),
//   ),
// }));

export const loginStateAtom = atom(true);
export const isOnProgress = atom('relaxing');

export const readWriteAtom = atom(
  (get) => get(loginStateAtom),
  (_get, set, newValue: boolean) => set(loginStateAtom, newValue),
);
// const initTodo = new TodoList(sortTestCase[0].data);
// const initTodo = createTodoList('IndexedDB');
// export const todoList = atom(initTodo);
// export const todoList = atom(async () => await createTodoList('MemoryDB'));
const todoData = await createTodoList('IndexedDB');
export const todoList = atom(todoData);
export const activeTodo = atom([]);
export const asyncActiveTodo = atom(
  async (get) => await get(todoList).getActiveTodo(),
  async (get, set, newValue) => {
    get(todoList)
      .getActiveTodo()
      .catch(async (newActiveTodo) => {
        return await set(asyncActiveTodo, newActiveTodo);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
);

export const getActiveTodoAtom = atom(
  (get) => get(asyncActiveTodo),
  (get, set, newValue) => {
    get(todoList)
      .getActiveTodo()
      .then(async (data) => {
        return await set(asyncActiveTodo, data);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
);

export const targetElapsedTimeAtom = atom(0);

asyncActiveTodo.onMount = (setAtom) => {
  console.log('atom is mounted in provider');
};

export const elapsedTimeAtom = atom(0); // 초 단위 경과시간

export const startTimeAtom = atom(new Date());
export const postponeClicked = atom(false);
export const isFinishedAtom = atom(false);

export const displayDetailAtom = atom('');
export const modalTypeAtom = atom(TABLE_MODALS.none);
export const editingTodoIdAtom = atom('');

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
          console.log(get(elapsedTimeAtom));
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
