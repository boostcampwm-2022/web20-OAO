import { ReactElement } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';

const { gray, green, white } = PRIMARY_COLORS;

const Wrapper = styled.button<{ size: number; color?: string; activeColor?: string; isActive: boolean }>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size * 2}px;
  box-sizing: content-box;
  padding: 2px;
  border-radius: ${(props) => props.size}px;
  border: 3px solid ${(props) => props.color ?? gray};
  background-color: ${(props) => (props.isActive ? props.activeColor ?? green : white)}7F;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  transition-duration: 0.3s;
`;

const Handle = styled.div<{ size: number; isActive: boolean }>`
  height: calc(100%);
  aspect-ratio: 1;
  border-radius: ${(props) => props.size / 2}px;
  background-color: ${(props) => props.color ?? gray};
  transform: translateX(${(props) => (props.isActive ? '100%' : '0%')});
  transition-duration: 0.3s;
`;

const ToggleButton = ({
  size,
  isActive,
  onClick,
  color,
  activeColor,
}: {
  size: number;
  isActive: boolean;
  onClick: () => void;
  color?: string;
  activeColor?: string;
}): ReactElement => {
  return (
    <Wrapper size={size} isActive={isActive} onClick={onClick} color={color} activeColor={activeColor}>
      <Handle size={size} isActive={isActive} />
    </Wrapper>
  );
};

export default ToggleButton;
