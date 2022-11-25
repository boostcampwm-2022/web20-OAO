import { FC } from 'react';
import styled from 'styled-components';

interface StyleProps {
  width?: string;
  height?: string;
  transform?: string;
  src: string;
}

interface Props extends StyleProps {
  src: string;
}

const StyledImage = styled.img<StyleProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  transform: ${({ transform }) => transform};
  content: url(${({ src }) => src});
`;

const Image: FC<Props> = ({ ...props }) => {
  return <StyledImage {...props} />;
};

export default Image;
