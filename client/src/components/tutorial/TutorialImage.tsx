import { ReactElement, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Dots } from './Dots';

import { PrevIcon, NextIcon, CancelIcon } from './Icons';
import { PRIMARY_COLORS } from '@util/Constants';
import Button from '@components/Button';

import Tutorial1 from '@images/tutorial/tutorial-page-1.svg';
import Tutorial2 from '@images/tutorial/tutorial-page-2.svg';
import Tutorial3 from '@images/tutorial/tutorial-page-3.svg';

const StyledOverlay = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${PRIMARY_COLORS.black};
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;

  & > img {
    width: 80%;
    height: 80%;
  }
`;

const imgSrcArray: string[] = [Tutorial1, Tutorial2, Tutorial3];

const StyledButton = styled(Button)`
  background-color: transparent;
`;

const StyledCancelButton = styled(Button)`
  position: absolute;
  background-color: transparent;
  top: 0px;
  right: 0px;
`;

export const TutorialImage = ({
  isTutorial,
  setIsOver,
}: {
  isTutorial: boolean;
  setIsOver: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const autoPlayRef = useRef<() => void>();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = (): void => {
      if (autoPlayRef.current !== undefined) autoPlayRef.current();
    };

    const interval = setInterval(play, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  const prevSlide = (): void => {
    setCurrentIndex(currentIndex === 0 ? imgSrcArray.length - 1 : currentIndex - 1);
  };

  const nextSlide = (): void => {
    setCurrentIndex(currentIndex === imgSrcArray.length - 1 ? 0 : currentIndex + 1);
  };

  const exit = (): void => {
    setIsOver(true);
  };
  return (
    <StyledOverlay>
      <StyledCancelButton context={<CancelIcon fill={PRIMARY_COLORS.white} />} onClick={exit} />
      <StyledButton context={<PrevIcon fill={PRIMARY_COLORS.white} />} onClick={prevSlide} />
      <img src={imgSrcArray[currentIndex]} />
      <StyledButton context={<NextIcon fill={PRIMARY_COLORS.white} />} onClick={nextSlide} />
      <Dots slides={imgSrcArray} currentIndex={currentIndex} />
    </StyledOverlay>
  );
};
