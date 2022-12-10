import { ReactElement, useRef, useState, memo } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';
import WarningBubble from './WarningBubble';
import ErrorBubble from './ErrorBubble';

const { yellow, red, gray } = PRIMARY_COLORS;

const Wrapper = styled.div`
  position: absolute;
  transform: translate(var(--x), var(--y));
  pointer-events: none;
  svg {
    pointer-events: none;
    path {
      pointer-events: stroke;
      transition: stroke-width 0.3s;
      cursor: pointer;
    }
  }
`;

// const toPathString = (width: number, height: number): string => {
//   if (width > 0) return `M2 0C2 ${0.4 * height} ${width - 2} ${0.6 * height} ${width - 2} ${height}`;
//   return `M${-width - 2} 0C${-width - 2} ${0.4 * height} 2 ${0.6 * height} 2 ${height}`;
// };

const getPathValue = (
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
  const path = `M${p1.x} ${p1.y}C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`;
  const width = end.x - start.x;
  const height = end.y - start.y;
  const viewBox = `${start.x} ${start.y} ${width} ${height}`;
  const translateX = -p1.x + start.x;
  const translateY = p1.y - start.y;
  return { path, width, height, viewBox, translateX, translateY };
};

const getColor = (type: 'NORMAL' | 'WARNING' | 'ERROR'): string => {
  return type === 'NORMAL' ? gray : type === 'WARNING' ? yellow : red;
};

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
  getOnClick: (type: 'Todo' | 'Vertex' | 'None', id: string) => (event: React.MouseEvent) => void;
}): ReactElement => {
  const style = {
    '--x': `${x1}px`,
    '--y': `${y1}px`,
  };
  const { path, width, height, viewBox, translateX, translateY } = getPathValue(x1, y1, x2, y2);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: NaN, y: NaN });
  const domRef = useRef<HTMLDivElement>(null);
  const onMouseLeave = (event: React.MouseEvent): void => {
    setIsHovered(false);
  };
  const onMouseEnter = (event: React.MouseEvent): void => {
    setMousePos(() => ({
      x: event.clientX - (domRef.current?.getBoundingClientRect().left as number),
      y: event.clientY - (domRef.current?.getBoundingClientRect().top as number),
    }));
    setIsHovered(true);
  };
  const onMouseMove = (event: React.MouseEvent): void => {
    if (isHovered && type !== 'NORMAL') {
      setMousePos(() => ({
        x: event.clientX - (domRef.current?.getBoundingClientRect().left as number),
        y: event.clientY - (domRef.current?.getBoundingClientRect().top as number),
      }));
    }
  };

  return (
    <Wrapper style={style as React.CSSProperties} ref={domRef}>
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        transform={`translate(${translateX}, ${translateY})`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path} stroke={getColor(type)} strokeWidth={isHovered ? 4 : 2} />
        <path
          d={path}
          stroke="#00000000"
          strokeWidth={25}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          onClick={getOnClick('Vertex', id)}
        />
      </svg>
      {isHovered && (
        <div style={{ position: 'absolute', left: `${mousePos.x}px`, top: `${mousePos.y}px` }}>
          {type === 'WARNING' ? <WarningBubble /> : type === 'ERROR' ? <ErrorBubble /> : ''}
        </div>
      )}
    </Wrapper>
  );
};

export default memo(TodoVertex);
