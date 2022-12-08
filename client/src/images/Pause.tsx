import { ReactElement, memo } from 'react';
import { BottomImageStyle, PRIMARY_COLORS } from '@util/Constants';

const { black } = PRIMARY_COLORS;

const Pause = ({ fill = black, width = '64px', height = '64px' }: BottomImageStyle): ReactElement => {
  return (
    <svg width={width} height={height} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="19" y="10" width="7" height="44" rx="3.5" fill={fill} />
      <rect x="38" y="10" width="7" height="44" rx="3.5" fill={fill} />
    </svg>
  );
};
export default memo(Pause);
