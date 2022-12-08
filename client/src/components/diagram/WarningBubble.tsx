import Bubble from '@components/todos/Bubble';
import { ReactElement } from 'react';
import Text from '@components/Text';
import Image from '@components/Image';
import Warning from '@images/Warning.svg';
import { PRIMARY_COLORS } from '@util/Constants';

const { yellow } = PRIMARY_COLORS;

const WarningBubble = ({ text }: { text: string }): ReactElement => {
  return (
    <Bubble backgroundColor={yellow}>
      <Image src={Warning} />
      <Text text={text} fontWeight={'500'} fontFamily={'Nanum Myeongjo'} fontSize={'14px'} />
    </Bubble>
  );
};

export default WarningBubble;
