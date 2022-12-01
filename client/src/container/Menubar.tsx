import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Home from '@images/Home.svg';
import Table from '@images/Table.svg';
import Image from '@components/Image';
import Button from '@components/Button';

const Wrapper = styled.div`
  height: 100vh;
  background: #fcfcfc;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

const Menubar = (): ReactElement => {
  return (
    <Wrapper>
      <Link to="/">
        <Image src={Home} margin={'30px 0 0 0'} />
      </Link>
      <Link to="/todos">
        <Button context={<Image src={Table} margin={'30px 0 0 0'} />} />
      </Link>
    </Wrapper>
  );
};

export default Menubar;
