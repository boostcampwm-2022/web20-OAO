import Bubble from '@components/Bubble';
import { ReactElement } from 'react';
import Text from '@components/Text';
import Image from '@components/Image';
import Warning from '@images/Warning.svg';
import { PRIMARY_COLORS } from '@util/Constants';

const { yellow } = PRIMARY_COLORS;

const WarningBubble = (): ReactElement => {
  return (
    <Bubble backgroundColor={yellow}>
      <Image src={Warning} />
      <Text
        text={'이어할 일의 우선순위가 먼저할 일보다 높습니다!'}
        fontWeight={'500'}
        fontFamily={'Nanum Myeongjo'}
        fontSize={'14px'}
      />
    </Bubble>
  );
};

export default WarningBubble;
