import { ReactElement, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { todoList } from '@util/GlobalState';
import styled from 'styled-components';
import { getDiagramData, DiagramTodo } from '@util/diagram.util';
import { PRIMARY_COLORS } from '@util/Constants';

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

  useEffect(() => {
    getDiagramData(todoListAtom)
      .then((value) => setDiagramData(value))
      .catch((err) => {
        throw err;
      });
  }, [todoListAtom]);

  return (
    <Wrapper w={2000} h={2000}>
      <div></div>
    </Wrapper>
  );
};

export default Diagram;
