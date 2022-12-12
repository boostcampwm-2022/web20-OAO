import { ReactElement } from 'react';
import styled from 'styled-components';

import LongLogo from '@images/LongLogo.svg';

import { Link } from 'react-router-dom';
import Image from '@components/Image';
import Button from '@components/Button';
import Text from '@components/Text';
import { PRIMARY_COLORS } from '@util/Constants';

import { isTutorialAtom } from '@util/GlobalState';
import { useAtom } from 'jotai';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  padding: 25px;
  font-family: 'Roboto';
`;

const Header = (): ReactElement => {
  const [isTutorial, setIsTutorial] = useAtom(isTutorialAtom);
  const url: string = isTutorial ? '/tutorials' : '/';
  return (
    <Wrapper>
      <Link to={`${url}`}>
        <Image src={LongLogo} flexGrow={3} />
      </Link>
      {isTutorial ? (
        <Link to="/" onClick={() => setIsTutorial(false)}>
          <Button
            context={
              <Text
                text="튜토리얼 끝내기"
                color={PRIMARY_COLORS.red}
                fontWeight={'700'}
                fontSize={'24px'}
                fontFamily={'Nanum Myeongjo'}
              />
            }
          />
        </Link>
      ) : (
        <Link to="/tutorials" onClick={() => setIsTutorial(true)}>
          <Button
            context={
              <Text
                text="튜토리얼 해보기"
                color={PRIMARY_COLORS.blue}
                fontWeight={'700'}
                fontSize={'20px'}
                fontFamily={'Nanum Myeongjo'}
              />
            }
          />
        </Link>
      )}
    </Wrapper>
  );
};

export default Header;
