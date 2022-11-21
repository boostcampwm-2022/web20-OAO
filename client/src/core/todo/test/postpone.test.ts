import { uuid } from 'uuidv4';
import { Todo } from '..';
import postponeTestCases from './postpone.data';

const DAY = 24 * 60 * 60 * 1000;

const extendDeadline = (todo: Todo): Todo => ({ ...todo, until: new Date(todo.until.getTime() + DAY) });

const isEqualPriority = (todo1: Todo, todo2: Todo): boolean => {
  return todo1.until.getTime() === todo2.until.getTime() && todo1.importance === todo2.importance;
};

const ignoreTemporally = (todoList: Array<Todo>): Array<Todo> => {
  const activeTodo = { ...todoList[0] };
  return todoList
    .filter((el) => isEqualPriority(el, activeTodo))
    .slice(1)
    .concat([activeTodo])
    .concat(todoList.filter((el) => !isEqualPriority(el, activeTodo)));
};

const lowerImportance = (todo: Todo): Todo => ({ ...todo, importance: Math.max(todo.importance - 1, 1) });

const ignoreForToday = (todo: Todo): Todo => {
  const today = new Date();
  return { ...todo, from: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1) };
};

describe('미루기 알고리즘 테스트', () => {
  describe('Deadline 미루기', () => {
    test.each(postponeTestCases.extendDeadline)('Imminent Todo의 Deadline 뒤로 미루기', (input, output) => {
      expect(extendDeadline(input).until.getTime()).toBe(output.until.getTime());
    });
  });
  describe('잠시 미루기', () => {
    it('동일 Importance, 같은 데드라인의 Todo List에서 미루기', () => {});
    it('동일 Importance, 같은 데드라인의 다른 Todo가 없는 경우 에러 처리', () => {});
  });
  describe('Importance 낮추기', () => {
    it('Importance 낮추기', () => {});
  });
  describe('오늘 하루 미루기', () => {
    it('Distant Todo 오늘 하루 보이지 않게 미루기', () => {});
    it('Distant Todo가 아닌 경우 에러 처리', () => {});
  });
});
