import { ReactElement, useEffect, useState, useRef } from 'react';
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
import PopUp from '@components/diagram/PopUp';

const { offWhite, green } = PRIMARY_COLORS;

const Wrapper = styled.div`
  position: relative;
  background-color: ${offWhite};
  transform: translate(var(--offsetX), var(--offsetY));
`;

const Detector = styled.div`
  position: absolute;
  background-color: ${offWhite};
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const HorizontalBaseLine = styled.div`
  position: absolute;
  height: 0;
  width: 100%;
  top: 40px;
  transform: translateY(var(--offsetY));
  border-top: 4px dashed ${green};
  opacity: 0.5;
`;

const VerticalBaseLine = styled.div`
  position: absolute;
  height: 100%;
  width: 0;
  left: 110px;
  transform: translateX(var(--offsetX));
  border-left: 4px dashed ${green};
  opacity: 0.5;
`;

interface PopUpData {
  type: 'Todo' | 'Vertex' | 'None';
  x: number;
  y: number;
  id: string;
}

const Diagram = ({ showDone }: { showDone: boolean }): ReactElement => {
  const [todoListAtom] = useAtom(todoList);
  const [diagramData, setDiagramData] = useState<Map<string, DiagramTodo> | undefined>();
  const [diagramVertice, setDiagramVertice] = useState<Vertex[] | undefined>();
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 100, y: 100 });
  const [popUpData, setPopUpData] = useState<PopUpData>({ type: 'None', x: 0, y: 0, id: '' });
  const isWheelDown = useRef<boolean>(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getDiagramData(todoListAtom, showDone)
      .then((value) => {
        setDiagramData(value);
        setDiagramVertice(getVertice(value));
      })
      .catch((err) => {
        throw err;
      });
  }, [todoListAtom, showDone]);

  const diagramStyle = {
    '--offsetX': `${offset.x}px`,
    '--offsetY': `${offset.y}px`,
  };

  const horizontalLineStyle = {
    '--offsetY': `${offset.y}px`,
  };

  const verticalLineStyle = {
    '--offsetX': `${offset.x}px`,
  };

  const onWheelDown = (event: React.MouseEvent): void => {
    if (event.button === 1) {
      isWheelDown.current = true;
    }
  };

  const onWheelUp = (event: React.MouseEvent): void => {
    isWheelDown.current = false;
  };

  const onWheelLeave = (event: React.MouseEvent): void => {
    isWheelDown.current = false;
  };

  const onMouseMove = (event: React.MouseEvent): void => {
    if (isWheelDown.current) {
      setOffset((prev) => ({ x: prev.x + event.movementX, y: prev.y + event.movementY }));
    }
  };

  const getOnClick = (type: 'Todo' | 'Vertex' | 'None', id: string) => {
    return (event: React.MouseEvent): void => {
      setPopUpData({
        type,
        id,
        x: event.clientX - offset.x - (domRef.current?.getBoundingClientRect().left as number),
        y: event.clientY - offset.y - (domRef.current?.getBoundingClientRect().top as number),
      });
      event.stopPropagation();
    };
  };

  return (
    <div
      onMouseDown={onWheelDown}
      onMouseUp={onWheelUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onWheelLeave}
      onClick={getOnClick('None', '')}
      ref={domRef}
    >
      <Detector />
      <HorizontalBaseLine style={horizontalLineStyle as React.CSSProperties} />
      <VerticalBaseLine style={verticalLineStyle as React.CSSProperties} />
      <Wrapper style={diagramStyle as React.CSSProperties}>
        {diagramData !== undefined &&
          diagramVertice?.map((el) => {
            const { x1, y1, x2, y2 } = getVertexDimension(diagramData, el);
            return (
              <TodoVertex
                key={`${el.from}+${el.to}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                onPopUp={getOnClick('Vertex', `${el.from}+${el.to}`)}
              />
            );
          })}
        {diagramData !== undefined &&
          [...diagramData].map((el) => {
            const pos = calculatePosition(el[1].order as number, el[1].depth as number);
            return (
              <TodoBlock
                key={el[1].todo.id}
                todo={el[1].todo}
                x={pos.x}
                y={pos.y}
                onPopUp={getOnClick('Todo', el[1].todo.id)}
              />
            );
          })}
        {popUpData.type !== 'None' && <PopUp {...popUpData} />}
      </Wrapper>
    </div>
  );
};

export default Diagram;
