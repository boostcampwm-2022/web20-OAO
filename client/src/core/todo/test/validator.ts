import { Todo } from '../todoList';

const onlyDate = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const isEqualDate = (d1: Date, d2: Date): boolean => onlyDate(d1).getTime() === onlyDate(d2).getTime();

const validateImminenceSort = (todoList: Todo[], testToday: Date): boolean => {
  return todoList
    .map((el, i) => ({ index: i, todo: el }))
    .filter((el) => isEqualDate(testToday, el.todo.until))
    .reduce((acc, el, i) => {
      return acc && el.index === i;
    }, true);
};

const validateImportance = (todoList: Todo[]): boolean =>
  todoList.reduce((acc, el, i, arr) => acc && (i === 0 || el.importance <= arr[i - 1].importance), true);

const validateImportanceSort = (todoList: Todo[], testToday: Date): boolean => {
  if (!validateImminenceSort(todoList, testToday)) return false;
  const divider = todoList.filter((el) => isEqualDate(testToday, el.until)).length;
  return validateImportance(todoList.slice(0, divider)) && validateImportance(todoList.slice(divider));
};

const equalForImportanceSort = (todo1: Todo, todo2: Todo): boolean => {
  return todo1.importance === todo2.importance;
};

const validateDeadlineSort = (todoList: Todo[], testToday: Date): boolean => {
  if (!validateImportanceSort(todoList, testToday)) return false;
  todoList.reduce(
    (acc, el, i, arr) => i === 0 || (acc && (equalForImportanceSort(el, arr[i - 1]) || el.until >= arr[i - 1].until)),
    true,
  );
  return true;
};

const equalForDeadlineSort = (todo1: Todo, todo2: Todo): boolean => {
  return todo1.importance === todo2.importance && todo1.until.getTime() === todo2.until.getTime();
};

const validateLastPostponedSort = (todoList: Todo[], testToday: Date): boolean => {
  if (!validateDeadlineSort(todoList, testToday)) return false;
  todoList.reduce(
    (acc, el, i, arr) =>
      i === 0 || (acc && (equalForDeadlineSort(el, arr[i - 1]) || el.lastPostponed >= arr[i - 1].lastPostponed)),
    true,
  );
  return true;
};

const isFromBeforeToday = (testToday: Date, from: Date): boolean => from.getTime() <= testToday.getTime();
const isAllPrevDone = (todo: Todo, todoList: Todo[]): boolean =>
  todo.prev.reduce((acc, id) => acc && todoList.find((el) => el.id === id)?.state === 'DONE', true);

const validateRTL = (todoList: Todo[], testToday: Date): boolean =>
  todoList
    .filter((el) => el.state === 'READY')
    .reduce((acc, el) => acc && isFromBeforeToday(testToday, el.from) && isAllPrevDone(el, todoList), true);

const validateWTL = (todoList: Todo[], testToday: Date): boolean =>
  todoList
    .filter((el) => el.state === 'WAIT')
    .reduce((acc, el) => acc && (!isFromBeforeToday(testToday, el.from) || !isAllPrevDone(el, todoList)), true);
export {
  validateImminenceSort,
  validateImportanceSort,
  validateDeadlineSort,
  validateLastPostponedSort,
  validateRTL,
  validateWTL,
};
