import { ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import styled from 'styled-components';
import Header from './container/Header';
import Menubar from './container/Menubar';

const Wrapper = styled.div`
  width: 100%;
`;

const App = (): ReactElement => {
  return (
    <>
      <Menubar />
      <Wrapper>
        <Header />
        <RouterProvider router={router} />
      </Wrapper>
    </>
  );
};

export default App;
