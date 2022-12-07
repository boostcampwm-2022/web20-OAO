import { ReactElement } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';

const { darkestGray, offWhite } = PRIMARY_COLORS;

const Wrapper = styled.div`
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  border-top: 2px solid ${darkestGray};
  background-color: ${offWhite};
`;

const Diagram = (): ReactElement => {
  return <Wrapper></Wrapper>;
};

export default Diagram;
