import { ReactElement } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';

const Dot = styled.span<{ active: boolean }>`
  padding: 5px;
  margin-right: 10px;
  cursor: none;
  border-radius: 50%;
  background: ${(props) => (props.active ? `${PRIMARY_COLORS.lightGray}` : `${PRIMARY_COLORS.darkGray}`)}};
`;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 25px;
  width: 100%;
`;

interface DotsProps {
  slides: string[];
  currentIndex: number;
}

export const Dots = ({ slides, currentIndex }: DotsProps): ReactElement => {
  return (
    <Wrapper>
      {slides.map((slide, i) => (
        <Dot key={slide} active={currentIndex === i} />
      ))}
    </Wrapper>
  );
};
