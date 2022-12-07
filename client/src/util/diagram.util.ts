import { TodoList } from '@todo/todoList';
import { Todo } from '@todo/todo';
import Queue from '@util/queue';

export interface DiagramTodo {
  order?: number;
  depth?: number;
  todo: Todo;
}

export const topologySort = async (
  todoList: TodoList,
  filter: (todo: Todo) => boolean,
): Promise<Map<string, DiagramTodo>> => {
  const sortedTodoList = await todoList.getSortedListWithFilter(filter, []);
  const cloneTodoList = new Map<string, Todo>(sortedTodoList.map((el) => [el.id, new Todo(el)]));
  const resultTodoList = new Map<string, DiagramTodo>(
    sortedTodoList.map((el) => [el.id, { depth: NaN, todo: new Todo(el) }]),
  );

  const updateDepth = (id: string, depth: number): void => {
    const target = resultTodoList.get(id);
    if (target !== undefined) {
      target.depth = depth;
    }
  };

  const checkPrev = (id: string): boolean => {
    const target = cloneTodoList.get(id);
    if (target == null) throw new Error('ERROR: 찾으려는 id의 Todo가 없습니다.');
    return [...target.prev].every((prevId) => cloneTodoList.get(prevId)?.state === 'DONE');
  };

  const zeroDepthTodoList = sortedTodoList
    .filter((el) => checkPrev(el.id) && el.state !== 'DONE')
    .map((el) => ({ depth: 0, id: el.id }));

  const forwardQueue = new Queue(zeroDepthTodoList);
  while (!forwardQueue.isEmpty()) {
    const target = forwardQueue.pop();
    updateDepth(target.id, target.depth);
    const todo = cloneTodoList.get(target.id);
    if (todo === undefined) continue;
    [...todo.next].forEach((nextId) => {
      const nextTodo = cloneTodoList.get(nextId);
      if (nextTodo === undefined) return;
      nextTodo.prev.delete(target.id);
      if (nextTodo.prev.size === 0) {
        forwardQueue.push({ depth: target.depth + 1, id: nextId });
      }
    });
  }

  const backwardQueue = new Queue(zeroDepthTodoList);
  while (!backwardQueue.isEmpty()) {
    const target = backwardQueue.pop();
    updateDepth(target.id, target.depth);
    const todo = cloneTodoList.get(target.id);
    if (todo === undefined) continue;
    [...todo.prev].forEach((prevId) => {
      const prevTodo = cloneTodoList.get(prevId);
      if (prevTodo === undefined) return;
      prevTodo.next.delete(target.id);
      if (prevTodo.next.size === 0) {
        backwardQueue.push({ depth: target.depth - 1, id: prevId });
      }
    });
  }

  return resultTodoList;
};

export const calcOrder = (todoList: Map<string, DiagramTodo>): Map<string, DiagramTodo> => {
  const todoListArr = [...todoList];
  let j = 0;
  todoListArr.forEach((el, i, arr) => {
    const todo = el[1];
    if (i !== 0 && todo.depth === arr[i - 1][1].depth) j++;
    todo.order = i + j;
  });
  return new Map(todoListArr);
};
