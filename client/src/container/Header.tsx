import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import LongLogo from '@images/LongLogo.svg';

import { Link } from 'react-router-dom';
import Image from '@components/Image';
// import LoginButton from '@components/LoginButton';
import { ToggleButton } from '@components/tutorial/ToggleButton';
import { isTutorialAtom, toggleTodoListAtom } from '@util/GlobalState';

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
  const [isTutorial, setIsTutorial] = useAtom(isTutorialAtom);
  const [, setTest] = useAtom(toggleTodoListAtom);
  useEffect((): void => {
    setTest();
  }, [isTutorial]);
  return (
    <Wrapper>
      <Link to="/">
        <Image src={LongLogo} flexGrow={3} />
      </Link>
      <TutorialButtonWrapper>
        <span>튜토리얼 모드</span>
        <ToggleButton isActive={isTutorial} toggleActive={() => setIsTutorial(!isTutorial)} />
      </TutorialButtonWrapper>
    </Wrapper>
  );
};

export default Header;
