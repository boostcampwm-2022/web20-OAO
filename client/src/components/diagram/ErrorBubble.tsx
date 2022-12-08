import Bubble from '@components/todos/Bubble';
import { ReactElement } from 'react';
import Text from '@components/Text';
import Image from '@components/Image';
import Error from '@images/Error.svg';
import { PRIMARY_COLORS } from '@util/Constants';

const { red } = PRIMARY_COLORS;

const ErrorBubble = ({ text }: { text: string }): ReactElement => {
  return (
    <Bubble backgroundColor={red}>
      <Image src={Error} />
      <Text text={text} fontWeight={'500'} fontFamily={'Nanum Myeongjo'} fontSize={'14px'} />
    </Bubble>
  );
};

export default ErrorBubble;
