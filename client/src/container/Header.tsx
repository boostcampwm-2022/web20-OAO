import { ReactElement } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Text from '../components/Text';
import LongLogo from '../components/LongLogo';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 25px;
  font-family: 'Roboto';
`;

// const Login = styled.p``;
// const accountText = {
//   login: 'Sign out',
//   logout: 'Sign in',
// };

const Header = (): ReactElement => {
  return (
    <Wrapper>
      <Button context={<LongLogo />} />
      <Button context={<Text text={'Sign up'} fontFamily="roboto" />} />
    </Wrapper>
  );
};

export default Header;
