import { Todo } from '@todo/todo';
import { onlyDate } from '@todo/todo.util';
import { CompareFunc, CompareFuncObj, SortCommand } from '@todo/todoList.type';

const compareFunctions: CompareFuncObj = {
  imminence: (a: Todo, b: Todo, today?: Date): number => {
    const newToday = today ?? onlyDate(new Date());
    return (
      -Math.sign(newToday.getTime() - onlyDate(a.until).getTime()) +
      Math.sign(newToday.getTime() - onlyDate(b.until).getTime())
    );
  },
  until: (a: Todo, b: Todo): number => a.until.getTime() - b.until.getTime(),
  importance: (a: Todo, b: Todo): number => a.importance - b.importance,
  lastPostponed: (a: Todo, b: Todo): number => a.lastPostponed.getTime() - b.lastPostponed.getTime(),
  title: (a: Todo, b: Todo): number => {
    if (a.title === b.title) return 0;
    if (a.title < b.title) return -1;
    return 1;
  },
};

const getCompareFunction = ({ type, direction }: SortCommand, today?: Date): CompareFunc => {
  const multiplier = direction === 'ASCEND' ? 1 : direction === 'DESCEND' ? -1 : 0;
  return (a: Todo, b: Todo) => {
    return multiplier * compareFunctions[type](a, b, today);
  };
};

const defaultCompareFunctions: SortCommand[] = [
  { type: 'imminence', direction: 'ASCEND' },
  { type: 'importance', direction: 'DESCEND' },
  { type: 'until', direction: 'ASCEND' },
  { type: 'lastPostponed', direction: 'ASCEND' },
];

export const generateCompare = (compareArr: SortCommand[], today?: Date) => {
  return (a: Todo, b: Todo): number => {
    const compareFunctionArr = compareArr.map((el) => getCompareFunction(el, today));
    for (const comp of compareFunctionArr) {
      const result = comp(a, b);
      if (result !== 0) return result;
    }
    return 0;
  };
};

export const defaultCompare = generateCompare(defaultCompareFunctions);
export const getDefaultCompareForSpecificDate = (today: Date): ((a: Todo, b: Todo) => number) => {
  return generateCompare(defaultCompareFunctions, today);
};
