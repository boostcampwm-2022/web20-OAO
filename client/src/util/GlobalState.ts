import { atom } from 'jotai';
import { createTodoList } from '@todo/todoList.js';
import { TABLE_MODALS } from './Constants.js';
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
const todoData = await createTodoList('MemoryDB');
export const todoList = atom(todoData);
// export const activeTodoAtom = atom(async (get) => await get(todoList).getActiveTodo());

export const elasedTimeAtom = atom(0); // 초 단위 경과시간
export const startTimeAtom = atom(new Date());
export const postponeClicked = atom(false);
export const isFinishedAtom = atom(false);

export const displayDetailAtom = atom('');
export const modalTypeAtom = atom(TABLE_MODALS.none);
export const editingTodoIdAtom = atom('');
