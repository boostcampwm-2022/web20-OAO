import { ReactElement, useRef, useState, memo, useCallback } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';
import WarningBubble from './WarningBubble';
import ErrorBubble from './ErrorBubble';
import { getPathValue } from '@util/diagram.util';

const { yellow, red, gray } = PRIMARY_COLORS;

const Wrapper = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  transform: translate(var(--x), var(--y));
  transition: transform 1s;
  pointer-events: none;
  svg {
    transition: transform 1s, width 1s, height 1s;
    pointer-events: none;
    path {
      pointer-events: stroke;
      transition: stroke-width 0.3s, d 1s;
      cursor: pointer;
    }
  }
`;

const getColor = (type: 'NORMAL' | 'WARNING' | 'ERROR'): string => {
  return type === 'NORMAL' ? gray : type === 'WARNING' ? yellow : red;
};

interface VertexProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  id: string;
  type: 'NORMAL' | 'WARNING' | 'ERROR';
  isHovered: boolean;
  onMouseEnter: (event: React.MouseEvent) => void;
  onMouseLeave: (event: React.MouseEvent) => void;
  getOnMouseMove: (isHovered: boolean) => (event: React.MouseEvent) => void;
  getOnClick: (
    type: 'Todo' | 'Vertex' | 'None',
    id: string,
    targetPos: { x: number; y: number },
  ) => (event: React.MouseEvent) => void;
}

const Vertex = ({
  x1,
  y1,
  x2,
  y2,
  id,
  type,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  getOnMouseMove,
  getOnClick,
}: VertexProps): ReactElement => {
  const { path, width, height, translateX, translateY } = getPathValue(x1, y1, x2, y2);
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      transform={`translate(${translateX}, ${translateY})`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d={path} stroke={getColor(type)} strokeWidth={isHovered ? 4 : 2} vectorEffect={'non-scaling-stroke'} />
      <path
        d={path}
        stroke="#00000000"
        strokeWidth={25}
        vectorEffect={'non-scaling-stroke'}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={getOnMouseMove(isHovered)}
        onClick={getOnClick('Vertex', id, { x: x1, y: y1 })}
      />
    </svg>
  );
};

const MemoVertex = memo(Vertex);

const TodoVertex = ({
  x1,
  y1,
  x2,
  y2,
  type,
  id,
  getOnClick,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  id: string;
  type: 'NORMAL' | 'WARNING' | 'ERROR';
  getOnClick: (
    type: 'Todo' | 'Vertex' | 'None',
    id: string,
    targetPos: { x: number; y: number },
  ) => (event: React.MouseEvent) => void;
}): ReactElement => {
  const style = {
    '--x': `${x1}px`,
    '--y': `${y1}px`,
  };
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: NaN, y: NaN });
  const domRef = useRef<HTMLDivElement>(null);
  const onMouseLeave = useCallback((event: React.MouseEvent): void => {
    setIsHovered(() => false);
  }, []);
  const onMouseEnter = useCallback((event: React.MouseEvent): void => {
    setMousePos(() => ({
      x: event.clientX - (domRef.current?.getBoundingClientRect().left as number),
      y: event.clientY - (domRef.current?.getBoundingClientRect().top as number),
    }));
    setIsHovered(() => true);
  }, []);
  const getOnMouseMove = useCallback((isHovered: boolean) => {
    return (event: React.MouseEvent): void => {
      if (isHovered && type !== 'NORMAL') {
        setMousePos(() => ({
          x: event.clientX - (domRef.current?.getBoundingClientRect().left as number),
          y: event.clientY - (domRef.current?.getBoundingClientRect().top as number),
        }));
      }
    };
  }, []);

  return (
    <Wrapper style={style as React.CSSProperties} ref={domRef}>
      <MemoVertex
        {...{ x1, y1, x2, y2, id, type, isHovered, onMouseEnter, onMouseLeave, getOnMouseMove }}
        getOnClick={getOnClick}
      />
      {isHovered && (
        <div style={{ position: 'absolute', left: `${mousePos.x}px`, top: `${mousePos.y}px` }}>
          {type === 'WARNING' ? <WarningBubble /> : type === 'ERROR' ? <ErrorBubble /> : ''}
        </div>
      )}
    </Wrapper>
  );
};

export default memo(TodoVertex);
