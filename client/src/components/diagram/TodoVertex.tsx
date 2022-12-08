import { ReactElement, useState } from 'react';
import styled from 'styled-components';

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

const TodoVertex = ({
  x1,
  y1,
  x2,
  y2,
  onPopUp,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
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
  const [strokeWidth, setStrokeWidth] = useState(2);
  const onMouseLeave = (): void => {
    setStrokeWidth(2);
  };
  const onMouseEnter = (): void => {
    setStrokeWidth(4);
  };
  return (
    <Wrapper style={style as React.CSSProperties}>
      <svg
        width={Math.abs(width)}
        height={height}
        viewBox={`0 0 ${Math.abs(width)} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={toPathString(width, height)} stroke="#5C5C5C" strokeWidth={strokeWidth} />
        <path
          d={toPathString(width, height)}
          stroke="#00000000"
          strokeWidth={25}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onPopUp}
        />
      </svg>
    </Wrapper>
  );
};

export default TodoVertex;
