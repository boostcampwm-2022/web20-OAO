import { ReactElement } from 'react';
import styled from 'styled-components';

import LongLogo from '@images/LongLogo.svg';

import { Link } from 'react-router-dom';
import Image from '@components/Image';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  padding: 25px;
  font-family: 'Roboto';
  z-index: -10;
`;

const TutorialButtonWrapper = styled.div`
  font-family: 'Nanum Myeongjo';
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Header = (): ReactElement => {
  return (
    <Wrapper>
      <Link to="/">
        <Image src={LongLogo} flexGrow={3} />
      </Link>
      <TutorialButtonWrapper></TutorialButtonWrapper>
    </Wrapper>
  );
};

export default Header;
