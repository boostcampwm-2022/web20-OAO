import { ReactElement } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';

const Dot = styled.li<{ active: boolean }>`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 8px;
  cursor: pointer;
  text-align: -webkit-match-parent;

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    background-color: ${(props) => (props.active ? `${PRIMARY_COLORS.red}` : `${PRIMARY_COLORS.blue}`)};
    border-radius: 50%;
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Svg = styled.svg`
  width: 40px;
  height: 40px;
  fill: none;
`;

const Circle = styled.circle<{ duration: number }>`
  opacity: 1;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke-width: 3px;
  stroke: ${PRIMARY_COLORS.red};
  stroke-dasharray: 330;
  stroke-dashoffset: 60;
  animation: progress ${(props) => `${props.duration}s`} linear;
  @keyframes progress {
    0% {
      stroke-dashoffset: 330;
    }
    100% {
      stroke-dashoffset: 60;
    }
  }
`;

const Wrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  padding: 0;
  margin: 15px 0 0;
  list-style: none;
`;

interface DotsProps {
  slides: string[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
}

export const Dots = ({ slides, currentIndex, setCurrentIndex, duration }: DotsProps): ReactElement => {
  return (
    <Wrapper>
      {slides.map((slide, i) => {
        if (currentIndex === i) {
          return (
            <Dot key={slide} active={true} onClick={() => setCurrentIndex(i)}>
              <Svg>
                <Circle cx="20" cy="20" r="15" duration={2.9 * duration}></Circle>
              </Svg>
            </Dot>
          );
        }
        return <Dot key={slide} active={false} onClick={() => setCurrentIndex(i)} />;
      })}
    </Wrapper>
  );
};
