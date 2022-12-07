import { ReactElement, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { todoList } from '@util/GlobalState';
import styled from 'styled-components';
import {
  getDiagramData,
  DiagramTodo,
  calculatePosition,
  Vertex,
  getVertice,
  getVertexDimension,
} from '@util/diagram.util';
import { PRIMARY_COLORS } from '@util/Constants';
import TodoBlock from '@components/diagram/TodoBlock';
import TodoVertex from '@components/diagram/TodoVertex';

const { offWhite } = PRIMARY_COLORS;

const Wrapper = styled.div<{ w: number; h: number }>`
  position: relative;
  width: ${(props) => props.w}px;
  height: ${(props) => props.h}px;
  background-color: ${offWhite};
`;
const Diagram = (): ReactElement => {
  const [todoListAtom] = useAtom(todoList);
  const [diagramData, setDiagramData] = useState<Map<string, DiagramTodo> | undefined>();
  const [diagramVertice, setDiagramVertice] = useState<Vertex[] | undefined>();

  useEffect(() => {
    getDiagramData(todoListAtom)
      .then((value) => {
        setDiagramData(value);
        setDiagramVertice(getVertice(value));
      })
      .catch((err) => {
        throw err;
      });
  }, [todoListAtom]);

  return (
    <Wrapper w={2000} h={2000}>
      {diagramData !== undefined &&
        diagramVertice?.map((el) => {
          const { x1, y1, x2, y2 } = getVertexDimension(diagramData, el);
          return <TodoVertex key={`${el.from}+${el.to}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      {diagramData !== undefined &&
        [...diagramData].map((el) => {
          const pos = calculatePosition(el[1].order as number, el[1].depth as number);
          return <TodoBlock key={el[1].todo.id} todo={el[1].todo} x={pos.x} y={pos.y} />;
        })}
    </Wrapper>
  );
};

export default Diagram;
