import { ReactElement, memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Home from '@images/Home.svg';
import Table from '@images/Table.svg';

import Image from '@components/Image';
import Diagram from '@images/Diagram.svg';

const Wrapper = styled.div`
  position: relative;
  width: max-content;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 8vh;
  background: #fcfcfc;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  z-index: 1000000;
`;

const Menubar = (): ReactElement => {
  return (
    <Wrapper>
      <Link to="/">
        <Image src={Home} />
      </Link>
      <Link to="/todos">
        <Image src={Table} />
      </Link>
      <Link to="/diagram">
        <Image src={Diagram} />
      </Link>
    </Wrapper>
  );
};

export default memo(Menubar);
