import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';

const { white, gray } = PRIMARY_COLORS;

const Wrapper = styled.div<{ color?: string; backgroundColor?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  height: max-content;
  border-radius: 8px;
  padding-block: 12px;
  padding-inline: 12px;
  color: ${(props) => props.color ?? white};
  background-color: ${(props) => props.backgroundColor ?? gray};
  gap: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  transform: translate(20px, -50%);

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    right: 100%;
    top: 50%;
    transform: translate(0, -50%);
    border-top: 7px solid transparent;
    border-right: 8.5px solid ${(props) => props.backgroundColor ?? gray};
    border-bottom: 7px solid transparent;
    border-left: 0px solid transparent;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`;

const Bubble = ({
  children,
  color,
  backgroundColor,
}: {
  children: ReactNode;
  color?: string;
  backgroundColor?: string;
}): ReactElement => {
  return (
    <Wrapper color={color} backgroundColor={backgroundColor}>
      {children}
    </Wrapper>
  );
};

export default Bubble;
