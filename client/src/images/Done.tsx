import { ReactElement, memo } from 'react';
import { BottomImageStyle, PRIMARY_COLORS } from '@util/Constants';

const { blue } = PRIMARY_COLORS;

const Done = ({ fill = blue, width = '64px', height = '64px' }: BottomImageStyle): ReactElement => {
  return (
    <svg width={width} height={height} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 57C45.8071 57 57 45.8071 57 32C57 18.1929 45.8071 7 32 7C18.1929 7 7 18.1929 7 32C7 45.8071 18.1929 57 32 57ZM47.6672 24.1539C48.7367 22.7049 48.429 20.6633 46.98 19.5938C45.5311 18.5243 43.4894 18.8319 42.4199 20.2809L28.2588 39.4669L20.5364 28.493C19.5 27.0202 17.4658 26.6664 15.993 27.7028C14.5202 28.7392 14.1665 30.7734 15.2029 32.2462L25.529 46.9201C26.1322 47.7773 27.1107 48.2923 28.1588 48.3041C29.207 48.316 30.1969 47.8233 30.8193 46.98L47.6672 24.1539Z"
        fill={fill}
      />
    </svg>
  );
};

export default memo(Done);
