import { ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import styled from 'styled-components';
import Header from './container/Header';
import Menubar from './container/Menubar';
import { Provider } from 'jotai';

const Wrapper = styled.div`
  width: 100%;
`;

const App = (): ReactElement => {
  return (
    <>
      <Provider>
        <Menubar />
        <Wrapper>
          <Header />
          <RouterProvider router={router} />
        </Wrapper>
      </Provider>
    </>
  );
};

export default App;
