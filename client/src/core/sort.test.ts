import { uuid } from 'uuidv4';
import { Todo } from '.';

const today = new Date();
const WEEK = 7 * 24 * 60 * 60 * 1000;

const generateRandomTodo = (): Todo => ({
  id: uuid(),
  title: uuid(),
  content: '',
  owner: '',
  priority: Math.ceil(Math.random() * 3),
  until: new Date(today.getTime() + Math.floor(Math.random() * WEEK)),
  from: new Date(1994, 10, 5),
  prev: [],
  next: [],
});

const generateRandomTodoList = (): Array<Todo> => Array.from({ length: 100 }, () => generateRandomTodo());

const onlyDate = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const sort = (todoList: Array<Todo>): Array<Todo> => {
  return [...todoList];
};

const validateImminence = (todoList: Array<Todo>): boolean => {
  const todayOnlyDate = onlyDate(today);
  return todoList
    .map((el, i) => ({ index: i, todo: el }))
    .filter((el) => todayOnlyDate === onlyDate(el.todo.until))
    .reduce((acc, el, i) => acc && el.index === i, true);
};

const validateImportance = (todoList: Array<Todo>): boolean => {
  return false;
};

const validateDeadline = (todoList: Array<Todo>): boolean => {
  return false;
};

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
  describe('Importance 정렬', () => {
    it('다른 조건이 모두 동일하다면, Importance가 높은 Todo가 Active된다.', () => {
      expect(validateImportance(sort(todoList))).toBe(true);
    });
  });
  describe('EDF 정렬', () => {
    it('다른 조건이 모두 동일하고, Deadline이 빠른 Todo가 Active된다.', () => {
      expect(validateDeadline(sort(todoList))).toBe(true);
    });
  });
  describe('Imminence + Importance 정렬', () => {
    it('Imminence 정렬이 Importance 정렬보다 우선한다.', () => {});
  });
  describe('Importance + EDF 정렬', () => {
    it('Importance 정렬이 EDF 정렬보다 우선한다.', () => {});
  });
  describe('Imminence + Importance + EDF', () => {
    it('Imminence 정렬이 Importance 정렬보다 우선하며, Importance 정렬이 EDF 정렬보다 우선한다.', () => {});
  });
});
