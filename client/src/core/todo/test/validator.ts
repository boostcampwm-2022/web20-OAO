import { TestTodo, testToday } from './type';

const onlyDate = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const isEqualDate = (d1: Date, d2: Date): boolean => onlyDate(d1).getTime() === onlyDate(d2).getTime();

const validateImminenceSort = (todoList: Array<TestTodo>): boolean => {
  return todoList
    .map((el, i) => ({ index: i, todo: el }))
    .filter((el) => isEqualDate(testToday, el.todo.until))
    .reduce((acc, el, i) => acc && el.index === i, true);
};

const validateImportance = (todoList: Array<TestTodo>): boolean =>
  todoList.reduce((acc, el, i, arr) => acc && (i === 0 || el.importance <= arr[i - 1].importance), true);

const validateImportanceSort = (todoList: Array<TestTodo>): boolean => {
  if (!validateImminenceSort(todoList)) return false;
  const imminentTodoList = todoList.filter((el) => isEqualDate(testToday, el.until));
  const distantTodoList = todoList.filter((el) => !isEqualDate(testToday, el.until));
  return validateImportance(imminentTodoList) && validateImportance(distantTodoList);
};

const validateDeadline = (todoList: Array<TestTodo>): boolean => {
  return todoList.reduce((acc, el, i, arr) => acc && (i === 0 || el.until >= arr[i - 1].until), true);
};

const validateDeadlineSort = (todoList: Array<TestTodo>): boolean => {
  if (!validateImportanceSort(todoList)) return false;
  const properties = [
    { imminence: true, importance: 3 },
    { imminence: true, importance: 2 },
    { imminence: true, importance: 1 },
    { imminence: false, importance: 3 },
    { imminence: false, importance: 2 },
    { imminence: false, importance: 1 },
  ];

  return properties.reduce(
    (acc, el) =>
      acc &&
      validateDeadline(
        todoList.filter(
          (todo) => el.imminence === isEqualDate(testToday, todo.until) && el.importance === todo.importance,
        ),
      ),
    true,
  );
};

export { validateImminenceSort, validateImportanceSort, validateDeadlineSort };
