import { ReactElement, memo } from 'react';
import { BottomImageStyle, PRIMARY_COLORS } from '@util/Constants';

const { black } = PRIMARY_COLORS;

const Start = ({ fill = black, stroke = black, width = '64px', height = '64px' }: BottomImageStyle): ReactElement => {
  return (
    <svg width={width} height={height} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 15.274L45.13 32L17 48.726L17 15.274Z" fill={fill} stroke={stroke} strokeWidth="6" />
    </svg>
  );
};

export default memo(Start);
