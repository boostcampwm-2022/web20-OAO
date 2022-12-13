import { TodoList } from '@todo/todoList';
import { useEffect, useState } from 'react';
import {
  getDiagramData,
  getTodoBlockProps,
  getVerticeProps,
  TodoBlockProps,
  VertexProps,
  DiagramTodo,
  getVertexFromPosition,
  getVertexToPosition,
} from '@util/diagram.util';

interface AniData<T> {
  aniState: string;
  props: T;
  timeout?: ReturnType<typeof setTimeout>;
}

type TodoBlockAniData = AniData<TodoBlockProps>;
type VertexAniData = AniData<VertexProps>;

const getUpdatedAniStates = (
  prev: Map<string, DiagramTodo>,
  next: Map<string, DiagramTodo>,
  prevTodoBlockData: Map<string, TodoBlockAniData>,
  prevVertexData: Map<string, VertexAniData>,
  setTodoBlockData: React.Dispatch<React.SetStateAction<Map<string, TodoBlockAniData>>>,
  setVertexData: React.Dispatch<React.SetStateAction<Map<string, VertexAniData>>>,
): void => {
  const mountTodo = [...getTodoBlockProps(next)].filter(([key]) => !prev.has(key));
  const idleTodo = [...getTodoBlockProps(next)].filter(([key]) => prev.has(key));
  const unmountTodo = [...getTodoBlockProps(prev)].filter(([key]) => !next.has(key));
  const resultTodoBlockData = new Map([...prevTodoBlockData]);
  idleTodo.forEach(([key, value]) => {
    const target = resultTodoBlockData.get(key);
    if (target === undefined) return;
    resultTodoBlockData.set(key, { ...target, props: value });
  });
  mountTodo.forEach(([key, value]) => {
    const target = resultTodoBlockData.get(key);
    if (target !== undefined) clearTimeout(target.timeout);
    const timeout = setTimeout(() => {
      setTodoBlockData((prev) => {
        const newState = new Map([...prev]);
        newState.set(key, { aniState: 'idle', props: value });
        return newState;
      });
    }, 50);
    resultTodoBlockData.set(key, { aniState: 'mount', props: value, timeout });
  });
  unmountTodo.forEach(([key, value]) => {
    const target = resultTodoBlockData.get(key);
    if (target !== undefined) clearTimeout(target.timeout);
    const timeout = setTimeout(() => {
      setTodoBlockData((prev) => {
        const newState = new Map([...prev]);
        newState.delete(key);
        return newState;
      });
    }, 500);
    resultTodoBlockData.set(key, { aniState: 'unmount', props: value, timeout });
  });

  const prevVertexMap = getVerticeProps(prev);
  const nextVertexMap = getVerticeProps(next);
  const mountVertex = [...nextVertexMap].filter(([key]) => !prevVertexMap.has(key));
  const idleVertex = [...nextVertexMap].filter(([key]) => prevVertexMap.has(key));
  const unmountVertex = [...prevVertexMap].filter(([key]) => !nextVertexMap.has(key));
  const resultVertexData = new Map([...prevVertexData]);
  idleVertex.forEach(([key, value]) => {
    const target = resultVertexData.get(key);
    if (target === undefined) return;
    resultVertexData.set(key, { ...target, props: value });
  });
  mountVertex.forEach(([key, value]) => {
    const target = resultVertexData.get(key);
    if (target !== undefined) clearTimeout(target.timeout);
    const timeout = setTimeout(() => {
      setVertexData((prev) => {
        const newState = new Map([...prev]);
        newState.set(key, { aniState: 'idle', props: value });
        return newState;
      });
    }, 50);
    let props = { ...value };
    const [from, to] = key.split('+');
    if (prev.has(from)) props = { ...props, ...getVertexFromPosition(prev, from) };
    if (prev.has(to)) props = { ...props, ...getVertexToPosition(prev, to) };
    resultVertexData.set(key, { aniState: 'mount', props, timeout });
    // console.log(resultVertexData.get(key));
  });
  unmountVertex.forEach(([key, value]) => {
    const target = resultVertexData.get(key);
    if (target !== undefined) clearTimeout(target.timeout);
    const timeout = setTimeout(() => {
      setVertexData((prev) => {
        const newState = new Map([...prev]);
        newState.delete(key);
        return newState;
      });
    }, 500);
    let props = { ...value };
    const [from, to] = key.split('+');
    if (next.has(from)) props = { ...props, ...getVertexFromPosition(next, from) };
    if (next.has(to)) props = { ...props, ...getVertexToPosition(next, to) };
    resultVertexData.set(key, { aniState: 'unmount', props, timeout });
  });
  setTodoBlockData(() => resultTodoBlockData);
  setVertexData(() => resultVertexData);
};

export const useDiagramAnimation = (
  todoList: TodoList,
  showDone: boolean,
): { todoBlockData: Map<string, TodoBlockAniData>; vertexData: Map<string, VertexAniData> } => {
  const [, setDiagramData] = useState<Map<string, DiagramTodo>>(new Map());
  const [todoBlockData, setTodoBlockData] = useState<Map<string, TodoBlockAniData>>(new Map());
  const [vertexData, setVertexData] = useState<Map<string, VertexAniData>>(new Map());
  useEffect(() => {
    getDiagramData(todoList, showDone)
      .then((newData) => {
        setDiagramData((prev) => {
          getUpdatedAniStates(prev, newData, todoBlockData, vertexData, setTodoBlockData, setVertexData);
          return newData;
        });
      })
      .catch((err) => {
        throw err;
      });
  }, [todoList, showDone]);
  return { todoBlockData, vertexData };
};
