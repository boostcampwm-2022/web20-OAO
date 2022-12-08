import { ReactElement, useRef, useState } from 'react';
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

const toPathString = (width: number, height: number): string => {
  if (width > 0) return `M2 0C2 ${0.4 * height} ${width - 2} ${0.6 * height} ${width - 2} ${height}`;
  return `M${-width - 2} 0C${-width - 2} ${0.4 * height} 2 ${0.6 * height} 2 ${height}`;
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
  onPopUp,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: 'NORMAL' | 'WARNING' | 'ERROR';
  onPopUp: (event: React.MouseEvent) => void;
}): ReactElement => {
  const x = Math.min(x1, x2);
  const y = Math.min(y1, y2);
  const width = x2 - x1;
  const height = y2 - y1;
  const style = {
    '--x': `${x}px`,
    '--y': `${y}px`,
  };
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
    if (isHovered) {
      setMousePos(() => ({
        x: event.clientX - (domRef.current?.getBoundingClientRect().left as number),
        y: event.clientY - (domRef.current?.getBoundingClientRect().top as number),
      }));
    }
  };
  return (
    <Wrapper style={style as React.CSSProperties} ref={domRef}>
      <svg
        width={Math.abs(width)}
        height={height}
        viewBox={`0 0 ${Math.abs(width)} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={toPathString(width, height)} stroke={getColor(type)} strokeWidth={isHovered ? 4 : 2} />
        <path
          d={toPathString(width, height)}
          stroke="#00000000"
          strokeWidth={25}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          onClick={onPopUp}
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

export default TodoVertex;
