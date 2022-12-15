import { TodoList } from '@todo/todoList';
import { Todo } from '@todo/todo';
import { PlainTodo } from '@todo/todo.type';
import Queue from '@util/queue';

export interface DiagramTodo {
  order?: number;
  depth?: number;
  todo: Todo;
}

const topologySort = async (todoList: TodoList, showDone: boolean): Promise<Map<string, DiagramTodo>> => {
  const filter = showDone ? () => true : (el: Todo | PlainTodo) => el.state !== 'DONE';
  const sortedTodoList = await todoList.getSortedListWithFilter(filter, []);
  const cloneTodoList = new Map<string, Todo>(sortedTodoList.map((el) => [el.id, new Todo(el)]));
  // Diagram에서 사용하지 않는 선후관계 의존성 제거
  cloneTodoList.forEach((el) => {
    el.prev.forEach((prevId) => {
      if (!cloneTodoList.has(prevId)) el.prev.delete(prevId);
    });
    el.next.forEach((nextId) => {
      if (!cloneTodoList.has(nextId)) el.next.delete(nextId);
    });
  });
  // 결과값 템플릿 오브젝트 생성
  const resultTodoList = new Map<string, DiagramTodo>(
    sortedTodoList.map((el) => [el.id, { depth: NaN, todo: new Todo(el) }]),
  );
  // 결과값들에서도 Diagram에서 사용하지 않는 선후관계 의존성 제거
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
      resultTodoList.set(id, { ...target, depth });
    }
  };

  const checkPrev = (id: string): boolean => {
    const target = cloneTodoList.get(id);
    if (target == null) throw new Error('ERROR: 찾으려는 id의 Todo가 없습니다.');
    return target.prev.size === 0;
  };

  const zeroDepthTodoList = sortedTodoList
    .filter((el) => filter(el) && checkPrev(el.id))
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

  const baseDepth = resultTodoList.get(sortedTodoList.find((el) => el.state === 'READY')?.id as string)?.depth ?? 0;
  resultTodoList.forEach((el) => ((el.depth as number) -= baseDepth));

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
  const offset = todoListArr.find((el) => el[1].todo.state === 'READY')?.[1].order ?? 0;
  return new Map(todoListArr.map((el) => [el[0], { ...el[1], order: (el[1].order as number) - offset }]));
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

export const BLOCK = {
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

export const getVertexFromPosition = (todoList: Map<string, DiagramTodo>, id: string): { x1: number; y1: number } => {
  const from = todoList.get(id);
  if (from === undefined) throw new Error('ERROR: 선후관계가 잘못된 레퍼런스를 참조하고 있습니다.');
  const fromPos = calculatePosition(from.order as number, from.depth as number);
  return {
    x1: fromPos.x + BLOCK.x / 2,
    y1: fromPos.y + BLOCK.y,
  };
};

export const getVertexToPosition = (todoList: Map<string, DiagramTodo>, id: string): { x2: number; y2: number } => {
  const to = todoList.get(id);
  if (to === undefined) throw new Error('ERROR: 선후관계가 잘못된 레퍼런스를 참조하고 있습니다.');
  const toPos = calculatePosition(to.order as number, to.depth as number);
  return {
    x2: toPos.x + BLOCK.x / 2,
    y2: toPos.y,
  };
};

export const validateVertex = (todoList: Map<string, DiagramTodo>, vertex: Vertex): 'NORMAL' | 'WARNING' | 'ERROR' => {
  const from = todoList.get(vertex.from);
  const to = todoList.get(vertex.to);
  if (from == null || to == null) throw new Error('ERROR: 선후관계가 잘못된 레퍼런스를 참조하고 있습니다.');
  if (from.todo.until.getTime() > to.todo.until.getTime()) return 'ERROR';
  if ((from.order as number) > (to.order as number)) return 'WARNING';
  return 'NORMAL';
};

export interface VertexProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: 'NORMAL' | 'WARNING' | 'ERROR';
  id: string;
}

export const getVerticeProps = (todoList: Map<string, DiagramTodo>): Map<string, VertexProps> => {
  const verticeArr = getVertice(todoList);
  return new Map(
    verticeArr.map((el) => {
      const pos = getVertexDimension(todoList, el);
      const type = validateVertex(todoList, el);
      const id = `${el.from}+${el.to}`;
      return [id, { id, ...pos, type }];
    }),
  );
};

export interface TodoBlockProps {
  todo: Todo;
  x: number;
  y: number;
  id: string;
}

export const getTodoBlockProps = (todoList: Map<string, DiagramTodo>): Map<string, TodoBlockProps> => {
  return new Map(
    [...todoList].map((el) => {
      const pos = calculatePosition(el[1].order as number, el[1].depth as number);
      return [el[0], { id: el[0], todo: el[1].todo, ...pos }];
    }),
  );
};

const BOX_OFFSET = 50;

export const getPathValue = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): { path: string; width: number; height: number; viewBox: string; translateX: number; translateY: number } => {
  const p1 = { x: 0, y: 0 };
  const c1 = { x: 0, y: 0.4 * Math.abs(y2 - y1) };
  const c2 = { x: x2 - x1, y: y2 - y1 - 0.4 * Math.abs(y2 - y1) };
  const p2 = { x: x2 - x1, y: y2 - y1 };
  const start = { x: Math.min(p1.x, c1.x, c2.x, p2.x), y: Math.min(p1.y, c1.y, c2.y, p2.y) };
  const end = { x: Math.max(p1.x, c1.x, c2.x, p2.x), y: Math.max(p1.y, c1.y, c2.y, p2.y) };
  const path = `M${BOX_OFFSET + p1.x - start.x} ${BOX_OFFSET + p1.y - start.y}C${BOX_OFFSET + c1.x - start.x} ${
    BOX_OFFSET + c1.y - start.y
  } ${BOX_OFFSET + c2.x - start.x} ${BOX_OFFSET + c2.y - start.y} ${BOX_OFFSET + p2.x - start.x} ${
    BOX_OFFSET + p2.y - start.y
  }`;
  const width = end.x - start.x + 2 * BOX_OFFSET;
  const height = end.y - start.y + 2 * BOX_OFFSET;
  const viewBox = `${start.x} ${start.y} ${width} ${height}`;
  const translateX = -p1.x + start.x - BOX_OFFSET;
  const translateY = -Math.abs(p1.y - start.y) - BOX_OFFSET;
  return { path, width, height, viewBox, translateX, translateY };
};

// export const getPathValue = (
//   x1: number,
//   y1: number,
//   x2: number,
//   y2: number,
// ): { path: string; width: number; height: number; viewBox: string; translateX: number; translateY: number } => {
//   const p1 = { x: 0, y: 0 };
//   const c1 = { x: 0, y: 0.4 };
//   const c2 = { x: Math.sign(x2 - x1), y: Math.sign(y2 - y1) - 0.4 };
//   const p2 = { x: Math.sign(x2 - x1), y: Math.sign(y2 - y1) };
//   const start = { x: Math.min(p1.x, c1.x, c2.x, p2.x), y: Math.min(p1.y, c1.y, c2.y, p2.y) };
//   const end = { x: Math.max(p1.x, c1.x, c2.x, p2.x), y: Math.max(p1.y, c1.y, c2.y, p2.y) };
//   const path = `M${p1.x} ${p1.y}C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`;
//   const width = end.x - start.x;
//   const height = end.y - start.y;
//   const viewBox = `${start.x} ${start.y} ${width} ${height}`;
//   const translateX = (-p1.x + start.x) * Math.abs(x2 - x1);
//   const translateY = -Math.abs(p1.y - start.y) * Math.abs(y2 - y1);
//   return {
//     path,
//     width: width * Math.abs(x2 - x1),
//     height: height * Math.abs(y2 - y1),
//     viewBox,
//     translateX,
//     translateY,
//   };
// };
