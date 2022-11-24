import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button';

import Home from '../images/Home.svg';
import Table from '../images/Table.svg';

const Wrapper = styled.div`
  height: 100vh;
  background: #fcfcfc;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

const Menubar = (): ReactElement => {
  const navigate = useNavigate();

  const goHome = (): void => {
    navigate('/');
  };

  const goTable = (): void => {
    navigate('/table');
  };

  return (
    <Wrapper>
      <Button context={<img src={Home} />} margin={'30px 0 0 0'} onClick={goHome} />
      <Button context={<img src={Table} />} margin={'30px 0 0 0'} onClick={goTable} />
    </Wrapper>
  );
};

export default Menubar;
