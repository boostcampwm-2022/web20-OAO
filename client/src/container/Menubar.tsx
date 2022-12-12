import { ReactElement, memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Home from '@images/Home.svg';
import Table from '@images/Table.svg';

import Image from '@components/Image';
import Diagram from '@images/Diagram.svg';
import { isTutorialAtom } from '@util/GlobalState';
import { useAtomValue } from 'jotai';

const Wrapper = styled.div`
  position: relative;
  width: max-content;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fcfcfc;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  z-index: 1000000;
`;

const Menubar = (): ReactElement => {
  const isTutorial = useAtomValue(isTutorialAtom);
  const prefix: string = isTutorial ? '/tutorials' : '';
  return (
    <Wrapper>
      <Link to={`${prefix}/`}>
        <Image src={Home} />
      </Link>
      <Link to={`${prefix}/todos`}>
        <Image src={Table} />
      </Link>
      <Link to={`${prefix}/diagram`}>
        <Image src={Diagram} />
      </Link>
    </Wrapper>
  );
};

export default memo(Menubar);
