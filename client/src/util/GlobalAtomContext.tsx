import { createContext, ReactElement, useContext } from 'react';
import { globalAtom } from '@util/GlobalState';
import { tutorialGlobalAtom } from '@util/TutorialGlobalState';

const GlobalAtomContext = createContext<typeof globalAtom>(globalAtom);

interface Props {
  isTutorial: boolean;
  children: React.ReactNode;
}

export const GlobalAtomProvider = ({ isTutorial, children }: Props): ReactElement => {
  return (
    <GlobalAtomContext.Provider value={isTutorial ? tutorialGlobalAtom : globalAtom}>
      {children}
    </GlobalAtomContext.Provider>
  );
};

export const useGlobalAtom = (): typeof globalAtom => useContext(GlobalAtomContext);
