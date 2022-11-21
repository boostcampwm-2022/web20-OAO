import { uuid } from 'uuidv4';
import { Todo } from '..';
import controlInput from './sort.data';

const today = new Date();
const WEEK = 7 * 24 * 60 * 60 * 1000;

const generateRandomTodo = (): Todo => ({
  id: uuid(),
  title: uuid(),
  content: '',
  owner: '',
  importance: Math.ceil(Math.random() * 3),
  until: new Date(today.getTime() + Math.floor(Math.random() * WEEK)),
  from: new Date(1994, 10, 5),
  prev: [],
  next: [],
});

const generateRandomTodoList = (): Array<Todo> => Array.from({ length: 100 }, () => generateRandomTodo());

const onlyDate = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const isEqualDate = (d1: Date, d2: Date): boolean => onlyDate(d1).getTime() === onlyDate(d2).getTime();

const sort = (todoList: Array<Todo>): Array<Todo> => {
  return [...todoList];
};

const validateImminence = (todoList: Array<Todo>): boolean => {
  return todoList
    .map((el, i) => ({ index: i, todo: el }))
    .filter((el) => isEqualDate(today, el.todo.until))
    .reduce((acc, el, i) => acc && el.index === i, true);
};

const validateImportance = (todoList: Array<Todo>): boolean =>
  todoList.reduce((acc, el, i, arr) => acc && (i === 0 || el.importance <= arr[i - 1].importance), true);

const validateImminenceImportance = (todoList: Array<Todo>): boolean => {
  if (!validateImminence(todoList)) return false;
  const imminentTodoList = todoList.filter((el) => isEqualDate(today, el.until));
  const distantTodoList = todoList.filter((el) => !isEqualDate(today, el.until));

  return validateImportance(imminentTodoList) && validateImportance(distantTodoList);
};

const validateDeadline = (todoList: Array<Todo>): boolean => {
  return todoList.reduce((acc, el, i, arr) => acc && (i === 0 || el.until >= arr[i - 1].until), true);
};

const validateAll = (todoList: Array<Todo>): boolean => {
  if (!validateImminenceImportance(todoList)) return false;
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
        todoList.filter((todo) => el.imminence === isEqualDate(today, todo.until) && el.importance === todo.importance),
      ),
    true,
  );
};

describe('검증 알고리즘 테스트', () => {
  let todoList: Array<Todo>;
  beforeEach(() => {
    todoList = controlInput;
  });
  describe('Imminence 정렬', () => {
    it('다른 조건이 모두 동일하다면, Imminent Todo가 Active된다.', () => {
      expect(validateImminence(sort(todoList))).toBe(true);
    });
  });
  describe('Imminence + Importance 정렬', () => {
    it('Imminence 정렬이 Importance 정렬보다 우선한다.', () => {
      expect(validateImminenceImportance(sort(todoList))).toBe(true);
    });
  });
  describe('Imminence + Importance + EDF', () => {
    it('Imminence 정렬이 Importance 정렬보다 우선하며, Importance 정렬이 EDF 정렬보다 우선한다.', () => {
      expect(validateAll(sort(todoList))).toBe(true);
    });
  });
});

describe('기본 정렬 테스트', () => {
  let todoList: Array<Todo>;
  beforeEach(() => {
    todoList = generateRandomTodoList();
  });
  describe('Imminence 정렬', () => {
    it('다른 조건이 모두 동일하다면, Imminent Todo가 Active된다.', () => {
      expect(validateImminence(sort(todoList))).toBe(true);
    });
  });
  describe('Imminence + Importance 정렬', () => {
    it('Imminence 정렬이 Importance 정렬보다 우선한다.', () => {
      expect(validateImminenceImportance(sort(todoList))).toBe(true);
    });
  });
  describe('Imminence + Importance + EDF', () => {
    it('Imminence 정렬이 Importance 정렬보다 우선하며, Importance 정렬이 EDF 정렬보다 우선한다.', () => {
      expect(validateAll(sort(todoList))).toBe(true);
    });
  });
});
