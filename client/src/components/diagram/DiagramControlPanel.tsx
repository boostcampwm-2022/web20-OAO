import { ReactElement } from 'react';
import styled from 'styled-components';
import ToggleButton from '@components/ToggleButton';
import { PRIMARY_COLORS } from '@util/Constants';
import Text from '@components/Text';

const { darkestGray, gray } = PRIMARY_COLORS;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: end;
  border-bottom: 2px solid ${darkestGray};
  align-items: center;
  gap: 5px;
`;
const DiagramControlPanel = ({ isActive, onClick }: { isActive: boolean; onClick: () => void }): ReactElement => {
  return (
    <Wrapper>
      <Text
        text={'완료한 Todo도 포함하기'}
        textAlign={'right'}
        fontWeight={'700'}
        fontFamily={'Nanum Myeongjo'}
        color={gray}
        fontSize={'14px'}
      />
      <ToggleButton size={14} isActive={isActive} onClick={onClick} activeColor={gray} />
    </Wrapper>
  );
};

export default DiagramControlPanel;
