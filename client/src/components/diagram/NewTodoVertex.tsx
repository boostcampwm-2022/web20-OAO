import { ReactElement, memo } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';
import { getPathValue, BLOCK } from '@util/diagram.util';

const { gray, blue } = PRIMARY_COLORS;

const Wrapper = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  transform: translate(var(--x), var(--y));
  pointer-events: none;
  svg {
    pointer-events: none;
    path {
      pointer-events: none;
      cursor: pointer;
    }
  }
`;

const Cursor = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  transform: translate(var(--x), var(--y));
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
    transform: translate(-10px, -5px);
    border-top: 20px solid ${gray};
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    border-left: 10px solid transparent;
  }
`;

interface VertexProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const NewTodoVertex = ({ x1, y1, x2, y2 }: VertexProps): ReactElement => {
  const x = x1 + BLOCK.x / 2;
  const y = y1 + BLOCK.y;
  const { path, width, height, viewBox, translateX, translateY } = getPathValue(x, y, x2, y2);
  const style = {
    '--x': `${x}px`,
    '--y': `${y}px`,
  };
  const cursorStyle = {
    '--x': `${x2}px`,
    '--y': `${y2}px`,
  };
  return (
    <>
      <Wrapper style={style as React.CSSProperties}>
        <svg
          width={width}
          height={height}
          viewBox={viewBox}
          fill="none"
          transform={`translate(${translateX}, ${translateY})`}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d={path} stroke={gray} strokeWidth={5} vectorEffect={'non-scaling-stroke'} />
        </svg>
      </Wrapper>
      <Cursor style={cursorStyle as React.CSSProperties} />
    </>
  );
};

export default memo(NewTodoVertex);
