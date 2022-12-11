import { ReactElement, memo, ReactNode } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';

const { lightGray } = PRIMARY_COLORS;

const Wrapper = styled.div`
  position: fixed;
  width: max-content;
  display: flex;
  padding: 5px;
  border-radius: 10px;
  background-color: ${lightGray};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  transform: translate(var(--x), var(--y));
`;

const PopUp = ({ x, y, children }: { x: number; y: number; children: ReactNode }): ReactElement => {
  const style = { '--x': `${x}px`, '--y': `${y}px` };
  return <Wrapper style={style as React.CSSProperties}>{children}</Wrapper>;
};

export default memo(PopUp);
