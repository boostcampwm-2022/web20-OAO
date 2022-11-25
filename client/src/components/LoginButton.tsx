import { useAtom } from 'jotai';
import { ReactElement } from 'react';
import { loginStateAtom } from '../util/GlobalState';

import Button from './Button';
import Text from './Text';

const BUTTON_TEXT = {
  signIn: 'Sign in',
  signOut: 'Sign out',
};
const LoginButton = (): ReactElement => {
  const [login, setUserLogin] = useAtom(loginStateAtom);
  const { signIn, signOut } = BUTTON_TEXT;

  return (
    <div>
      <Button
        context={<Text text={login ? signOut : signIn} fontFamily="roboto" />}
        onClick={() => setUserLogin(!login)}
        margin={'0 3vw 0 0'}
      />
      {!login && <Button context={<Text text={'Sign up'} fontFamily="roboto" />} />}
    </div>
  );
};

export default LoginButton;
