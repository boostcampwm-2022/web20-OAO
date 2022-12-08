import { ReactElement } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';

interface ButtonStylingProps {
  isActive: boolean;
}

const StyledButton = styled.button<ButtonStylingProps>`
  position: absolute;
  inset: 0px;
  transition: all 200ms ease 0s;
  border-radius: 22px;
  cursor: pointer;
  border: 2px solid ${PRIMARY_COLORS.gray};
  background: transparent;

  &::before {
    width: 14px;
    height: 14px;
    left: 3px;
    bottom: 2px;
    background-color: ${PRIMARY_COLORS.gray};
    position: absolute;
    content: '';
    transition: all 200ms ease 0s;
    border-radius: 50%;
  }

  ${({ isActive }) =>
    isActive &&
    `   
        background-color: ${PRIMARY_COLORS.blue};
        &::before {
          transform: translateX(16px);
        }
      `}
`;
const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
`;

interface ToggleButtonProps {
  isActive: boolean;
  toggleActive: () => void;
}

export const ToggleButton = ({ isActive, toggleActive, ...props }: ToggleButtonProps): ReactElement => {
  return (
    <Wrapper {...props}>
      <StyledButton isActive={isActive} onClick={toggleActive} />
    </Wrapper>
  );
};
