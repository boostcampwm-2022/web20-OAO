import { Todo } from '@todo/todo';
import { isEqualDate } from '@todo/todo.util';
import { CompareFunc, CompareFuncObj } from '@todo/todoList.type';

const compareFunctions: CompareFuncObj = {
  ascendImminence: (a: Todo, b: Todo): number => {
    const newToday = new Date();
    return -Number(isEqualDate(newToday, a.until)) + Number(isEqualDate(newToday, b.until));
  },
  descendImminence: (a: Todo, b: Todo): number => {
    const newToday = new Date();
    return Number(isEqualDate(newToday, a.until)) - Number(isEqualDate(newToday, b.until));
  },
  ascendDeadline: (a: Todo, b: Todo): number => a.until.getTime() - b.until.getTime(),
  descendDeadline: (a: Todo, b: Todo): number => -a.until.getTime() + b.until.getTime(),
  ascendImportance: (a: Todo, b: Todo): number => -b.importance + a.importance,
  descendImportance: (a: Todo, b: Todo): number => b.importance - a.importance,
  ascendLastPostponed: (a: Todo, b: Todo): number => a.lastPostponed.getTime() - b.lastPostponed.getTime(),
  descendLastPostponed: (a: Todo, b: Todo): number => -a.lastPostponed.getTime() + b.lastPostponed.getTime(),
  ascendTitle: (a: Todo, b: Todo): number => {
    if (a.title === b.title) return 0;
    if (a.title < b.title) return -1;
    return 1;
  },
  descendTitle: (a: Todo, b: Todo): number => {
    if (a.title === b.title) return 0;
    if (a.title < b.title) return 1;
    return -1;
  },
};

export const compareFunctionsMap: Map<string, CompareFunc> = new Map(
  Object.entries(compareFunctions).map(([name, func]) => [name.toLowerCase(), func]),
);

export const defaultCompareFunctions = ['ascendimminence', 'ascendImportance', 'ascenddeadline', 'ascendlastpostponed'];
