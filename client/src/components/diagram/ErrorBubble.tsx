import Bubble from '@components/Bubble';
import { ReactElement } from 'react';
import Text from '@components/Text';
import Image from '@components/Image';
import Error from '@images/Error.svg';
import { PRIMARY_COLORS } from '@util/Constants';

const { red } = PRIMARY_COLORS;

const ErrorBubble = (): ReactElement => {
  return (
    <Bubble backgroundColor={red}>
      <Image src={Error} />
      <Text
        text={'이어할 일의 마감일이 먼저할 일보다 빠릅니다!'}
        fontWeight={'500'}
        fontFamily={'Nanum Myeongjo'}
        fontSize={'14px'}
      />
    </Bubble>
  );
};

export default ErrorBubble;
