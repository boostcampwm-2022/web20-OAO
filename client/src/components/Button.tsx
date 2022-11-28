import { FC, ReactElement, memo } from 'react';
import styled from 'styled-components';

interface StyleProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
  margin?: string;
  flexGrow?: number;
}

interface Props extends StyleProps {
  context: string | ReactElement;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledButton = styled.button<StyleProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  border-radius: ${({ borderRadius }) => borderRadius};
  margin: ${({ margin }) => margin};
  flex-grow: ${({ flexGrow }) => flexGrow};
`;

const Button: FC<Props> = ({ context, onClick, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {context}
    </StyledButton>
  );
};

export default memo(Button);