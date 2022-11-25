import { FC } from 'react';
import styled from 'styled-components';

interface StyleProps {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  margin?: string;
}

interface Props extends StyleProps {
  text: string;
}

const StyledText = styled.p<StyleProps>`
  color: ${({ color }) => color};
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  margin: ${({ margin }) => margin};
`;

const Text: FC<Props> = ({ text, ...props }) => {
  return <StyledText {...props}>{text}</StyledText>;
};

export default Text;
