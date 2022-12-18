import { ReactElement, useState, useRef } from 'react';
import styled from 'styled-components';

import { CancelIcon } from './Icons';
import { PRIMARY_COLORS } from '@util/Constants';
import Button from '@components/Button';
import { Dots } from './Dots';

import Main from '@images/tutorial/main.mp4';
import Table from '@images/tutorial/table.mp4';
import Diagram from '@images/tutorial/diagram.mp4';

const videoSrcArray: string[] = [Main, Table, Diagram];
const titleArray: string[] = ['메인 페이지', '테이블 뷰', '다이어그램 뷰'];

const Title = styled.h1`
  font-family: 'Roboto';
  color: ${PRIMARY_COLORS.red};
`;

const StyledOverlay = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${PRIMARY_COLORS.black};
  opacity: 0.9;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
`;

const StyledCancelButton = styled(Button)`
  position: absolute;
  background-color: transparent;
  top: 0px;
  right: 0px;
`;

const StyledVideo = styled.video`
  position: relative;
  width: max-content;
  height: max-content;
  max-width: 80%;
  max-height: 80%;
`;

export const TutorialVideo = ({
  setIsOver,
}: {
  setIsOver: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactElement => {
  const ref = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleCancel = (): void => {
    setIsOver(true);
  };

  const onEnded = (): void => {
    setCurrentIndex(currentIndex === videoSrcArray.length - 1 ? 0 : currentIndex + 1);
  };

  const onLoadedMetadata = (): void => {
    if (ref.current === null) return;
    setDuration(ref.current.duration);
  };

  return (
    <StyledOverlay>
      <StyledCancelButton context={<CancelIcon fill={PRIMARY_COLORS.blue} />} onClick={handleCancel} />
      <Title>{titleArray[currentIndex]}</Title>
      <StyledVideo
        src={videoSrcArray[currentIndex]}
        ref={ref}
        onEnded={onEnded}
        onLoadedMetadata={onLoadedMetadata}
        autoPlay
        controls
      />
      <Dots slides={videoSrcArray} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} duration={duration} />
    </StyledOverlay>
  );
};
