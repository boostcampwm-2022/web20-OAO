import { ReactElement } from 'react';
import styled from 'styled-components';
import Image from '@components/Image';
import Text from '@components/Text';
import Planning from '@images/Planning.svg';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 65px;
  z-index: 1;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeroImage = styled(Image)`
  z-index: 10000;
  position: absolute;
  transform: translateY(30px);
`;

const DiagramHeader = (): ReactElement => {
  return (
    <Wrapper>
      <Text textAlign={'left'} margin={'0 25px'} text="다이어그램" />
      <ImageWrapper>
        <HeroImage src={Planning} />
      </ImageWrapper>
    </Wrapper>
  );
};

export default DiagramHeader;
