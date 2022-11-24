import { atom } from 'jotai';

export const loginStateAtom = atom(false);

export const readWriteAtom = atom(
  (get) => get(loginStateAtom),
  (_get, set, newValue: boolean) => set(loginStateAtom, newValue),
);
