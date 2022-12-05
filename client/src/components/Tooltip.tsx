import { ReactElement, ReactNode, useState } from 'react';
import styled from 'styled-components';

interface ContentProps {
  isVisible: boolean;
}

const TooltipWrapper = styled.div`
  position: relative;
`;

const Content = styled.div<ContentProps>`
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  width: max-content;
  background-color: #3f3f3f;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 10px 10px;

  position: absolute;
  z-index: 1;

  top: -10px;
  left: 120%;

  &::after {
    content: ' ';
    position: absolute;
    border-style: solid;
    border-width: 5px;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-color: transparent #3f3f3f transparent transparent;
  }
`;

interface InputProps {
  message: ReactNode;
  children: ReactNode;
}

export const Tooltip = ({ children, message }: InputProps): ReactElement => {
  const [isHovered, setIsHovered] = useState(false);
  const isVisible = isHovered;
  return (
    <TooltipWrapper onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
      <Content isVisible={isVisible}>{message}</Content>
    </TooltipWrapper>
  );
};
