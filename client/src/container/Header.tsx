import { ReactElement } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import Text from '../components/Text';
import LongLogo from '../images/LongLogo.svg';

import { useAtom } from 'jotai';
import { loginStateAtom } from '../util/GlobalState';
import { useNavigate } from 'react-router-dom';
// import { goHome } from '../util/Common';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 25px;
  font-family: 'Roboto';
`;

const FlexGrow3 = styled.div`
  flex-grow: 3;
`;

const Header = (): ReactElement => {
  const [login, setUserLogin] = useAtom(loginStateAtom);
  const navigate = useNavigate();

  const goHome = (): void => {
    navigate('/');
  };
  return (
    <Wrapper>
      <FlexGrow3>
        <Button context={<img src={LongLogo} />} onClick={goHome} />
      </FlexGrow3>
      {!login && (
        <Button
          context={<Text text={'Sign in'} fontFamily="roboto" />}
          onClick={() => setUserLogin(!login)}
          margin={'0 3vw 0 0'}
        />
      )}
      {!login && <Button context={<Text text={'Sign up'} fontFamily="roboto" />} />}
      {login && (
        <Button context={<Text text={'Sign out'} fontFamily="roboto" />} onClick={() => setUserLogin(!login)} />
      )}
    </Wrapper>
  );
};

export default Header;
