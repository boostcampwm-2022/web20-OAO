import Text from '@components/Text';

import { displayTimeAtom, elapsedTimeAtom } from '@util/GlobalState';
import { useAtom, useAtomValue } from 'jotai';
import { ReactElement, memo, useEffect } from 'react';

const ElapsedTimeText = ({ color }: { color: string }): ReactElement => {
  const elapsedTime = useAtomValue(elapsedTimeAtom);
  const [displayTime, setDisplayTime] = useAtom(displayTimeAtom);

  useEffect(() => {
    setDisplayTime();
  }, [elapsedTime]);

  return <Text text={displayTime} fontFamily="Nanum Myeongjo" fontSize="1rem" color={color} />;
};
export default memo(ElapsedTimeText);
