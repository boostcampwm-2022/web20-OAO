import { atom } from 'jotai';

export const loginStateAtom = atom(true);
export const isOnProgress = atom('relaxing');

export const readWriteAtom = atom(
  (get) => get(loginStateAtom),
  (_get, set, newValue: boolean) => set(loginStateAtom, newValue),
);

export const mockTodosData = atom([
  {
    id: '0',
    title: '다람쥐 헌 쳇바퀴에 올라타',
    content: 'default content',
    owner: 'default user',
    importance: 1,
    until: 'Mon Sep 03 2022 16:26:10 GMT+0900 (Korean Standard Time)',
    from: 'Fri Sep 02 2022 12:39:39 GMT+0900 (Korean Standard Time)',
    next: [],
    prev: ['18'],
    lastPostponed: '2022-11-22T09:18:36.208Z',
    state: '',
  },
  {
    id: '1',
    title: 'default title',
    content: 'default content',
    owner: 'default user',
    importance: 1,
    until: 'Sat Nov 05 2022 10:25:59 GMT+0900 (Korean Standard Time)',
    from: 'Sun Oct 30 2022 21:56:23 GMT+0900 (Korean Standard Time)',
    next: [],
    prev: [],
    lastPostponed: '2022-11-22T09:18:36.208Z',
    state: 'READY',
  },
  {
    id: '2',
    title: 'default title',
    content: 'default content',
    owner: 'default user',
    importance: 1,
    until: 'Sun Nov 27 2022 12:10:26 GMT+0900 (Korean Standard Time)',
    from: 'Tue Nov 22 2022 15:37:02 GMT+0900 (Korean Standard Time)',
    next: [],
    prev: ['19'],
    lastPostponed: '2022-11-22T09:18:36.208Z',
    state: 'WAIT',
  },
]);

export const elasedTimeAtom = atom(0); // 초 단위 경과시간
export const startTimeAtom = atom(new Date());
