import { PlainTodo } from '../todoList';

const onlyDate = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const isEqualDate = (d1: Date, d2: Date): boolean => onlyDate(d1).getTime() === onlyDate(d2).getTime();

const toComparableTodo = (todo: PlainTodo): any => {
  return {
    ...todo,
    until: todo.until.getTime(),
    from: todo.from.getTime(),
    lastPostponed: todo.lastPostponed.getTime(),
  };
};

const validateImminenceSort = (todoList: PlainTodo[], testToday: Date): boolean => {
  return todoList
    .map((el, i) => ({ index: i, todo: el }))
    .filter((el) => isEqualDate(testToday, el.todo.until))
    .reduce((acc, el, i) => {
      return acc && el.index === i;
    }, true);
};

const validateImportance = (todoList: PlainTodo[]): boolean =>
  todoList.every((el, i, arr) => i === 0 || el.importance <= arr[i - 1].importance);

const validateImportanceSort = (todoList: PlainTodo[], testToday: Date): boolean => {
  if (!validateImminenceSort(todoList, testToday)) return false;
  const divider = todoList.filter((el) => isEqualDate(testToday, el.until)).length;
  return validateImportance(todoList.slice(0, divider)) && validateImportance(todoList.slice(divider));
};

const equalForImportanceSort = (todo1: PlainTodo, todo2: PlainTodo): boolean => {
  return todo1.importance === todo2.importance;
};

const validateDeadlineSort = (todoList: PlainTodo[], testToday: Date): boolean => {
  if (!validateImportanceSort(todoList, testToday)) return false;
  return todoList.every((el, i, arr) => {
    return i === 0 || !equalForImportanceSort(el, arr[i - 1]) || el.until >= arr[i - 1].until;
  });
};

const equalForDeadlineSort = (todo1: PlainTodo, todo2: PlainTodo): boolean => {
  return todo1.importance === todo2.importance && todo1.until.getTime() === todo2.until.getTime();
};

const validateLastPostponedSort = (todoList: PlainTodo[], testToday: Date): boolean => {
  if (!validateDeadlineSort(todoList, testToday)) return false;
  return todoList.every((el, i, arr) => {
    return i === 0 || !equalForDeadlineSort(el, arr[i - 1]) || el.lastPostponed >= arr[i - 1].lastPostponed;
  });
};

const isFromBeforeToday = (testToday: Date, from: Date): boolean => from.getTime() <= testToday.getTime();
const isAllPrevDone = (todo: PlainTodo, todoList: PlainTodo[]): boolean =>
  todo.prev.every((id) => todoList.find((el) => el.id === id)?.state === 'DONE');

const validateRTL = (todoList: PlainTodo[], testToday: Date): boolean =>
  todoList
    .filter((el) => el.state === 'READY')
    .every((el) => isFromBeforeToday(testToday, el.from) && isAllPrevDone(el, todoList));

const validateWTL = (todoList: PlainTodo[], testToday: Date): boolean =>
  todoList
    .filter((el) => el.state === 'WAIT')
    .every((el) => !isFromBeforeToday(testToday, el.from) || !isAllPrevDone(el, todoList));
export {
  toComparableTodo,
  validateImminenceSort,
  validateImportanceSort,
  validateDeadlineSort,
  validateLastPostponedSort,
  validateRTL,
  validateWTL,
};
