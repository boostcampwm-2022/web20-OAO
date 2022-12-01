import { FC, memo, ReactNode } from 'react';
import styled from 'styled-components';

interface StyleProps {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  margin?: string;
  textAlign?: string;
  children?: ReactNode;
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
  text-align: ${({ textAlign }) => textAlign};
`;

const Text: FC<Props> = ({ text, children, ...props }) => {
  return (
    <StyledText {...props}>
      {text}
      {children}
    </StyledText>
  );
};

export default memo(Text);
