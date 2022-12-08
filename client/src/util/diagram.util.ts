import { TodoList } from '@todo/todoList';
import { Todo } from '@todo/todo';
import { PlainTodo } from '@todo/todo.type';
import Queue from '@util/queue';
import { Id } from 'react-toastify';

export interface DiagramTodo {
  order?: number;
  depth?: number;
  todo: Todo;
}

const topologySort = async (todoList: TodoList, showDone: boolean): Promise<Map<string, DiagramTodo>> => {
  const filter = showDone ? () => true : (el) => el.state !== 'DONE';
  const sortedTodoList = await todoList.getSortedListWithFilter(filter, []);
  const cloneTodoList = new Map<string, Todo>(sortedTodoList.map((el) => [el.id, new Todo(el)]));
  cloneTodoList.forEach((el) => {
    el.prev.forEach((prevId) => {
      if (!cloneTodoList.has(prevId)) el.prev.delete(prevId);
    });
    el.next.forEach((nextId) => {
      if (!cloneTodoList.has(nextId)) el.next.delete(nextId);
    });
  });
  const resultTodoList = new Map<string, DiagramTodo>(
    sortedTodoList.map((el) => [el.id, { depth: NaN, todo: new Todo(el) }]),
  );
  resultTodoList.forEach((el) => {
    el.todo.prev.forEach((prevId) => {
      if (!cloneTodoList.has(prevId)) el.todo.prev.delete(prevId);
    });
    el.todo.next.forEach((nextId) => {
      if (!cloneTodoList.has(nextId)) el.todo.next.delete(nextId);
    });
  });

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
    .filter((el) => (showDone ? true : el.state !== 'DONE') && checkPrev(el.id))
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

  const activeTodo = sortedTodoList.find((el) => el.state === 'READY')?.id;
  const baseDepth = resultTodoList.get(activeTodo as string)?.depth;
  resultTodoList.forEach((el) => ((el.depth as number) -= baseDepth as number));

  return resultTodoList;
};

const calcOrder = (todoList: Map<string, DiagramTodo>): Map<string, DiagramTodo> => {
  const todoListArr = [...todoList];
  let j = 0;
  todoListArr.forEach((el, i, arr) => {
    const todo = el[1];
    if (i !== 0 && todo.depth === arr[i - 1][1].depth) j++;
    todo.order = i + j;
  });
  const offset = todoListArr.find((el) => el[1].depth === 0)?.[1].order;
  return new Map(todoListArr.map((el) => [el[0], { ...el[1], order: (el[1].order as number) - (offset as number) }]));
};

export const getDiagramData = async (todoList: TodoList, showDone: boolean): Promise<Map<string, DiagramTodo>> => {
  return calcOrder(await topologySort(todoList, showDone));
};

const MARGIN = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const GAP = {
  x: 55,
  y: 85,
};

const BLOCK = {
  x: 225,
  y: 75,
};

export const calculatePosition = (order: number, depth: number): { x: number; y: number } => {
  return { x: MARGIN.left + ((GAP.x + BLOCK.x) * order) / 2, y: MARGIN.top + (GAP.y + BLOCK.y) * depth };
};

export interface Vertex {
  from: string;
  to: string;
}

export const getVertice = (todoList: Map<string, DiagramTodo>): Vertex[] => {
  const todoListArr = [...todoList];
  const verticeArr: Vertex[] = [];
  todoListArr.forEach((el) => {
    el[1].todo.next.forEach((nextId) => {
      verticeArr.push({ from: el[1].todo.id, to: nextId });
    });
  });
  return verticeArr;
};

export const getVertexDimension = (
  todoList: Map<string, DiagramTodo>,
  vertex: Vertex,
): {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
} => {
  const from = todoList.get(vertex.from);
  const to = todoList.get(vertex.to);
  if (from == null || to == null) throw new Error('ERROR: 선후관계가 잘못된 레퍼런스를 참조하고 있습니다.');
  const fromPos = calculatePosition(from.order as number, from.depth as number);
  const toPos = calculatePosition(to.order as number, to.depth as number);
  return {
    x1: fromPos.x + BLOCK.x / 2,
    y1: fromPos.y + BLOCK.y,
    x2: toPos.x + BLOCK.x / 2,
    y2: toPos.y,
  };
};
