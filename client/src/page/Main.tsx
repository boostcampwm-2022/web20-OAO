import { useAtom, useAtomValue } from 'jotai';
import styled from 'styled-components';
import { ReactElement, Suspense, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useGlobalAtom } from '@util/GlobalAtomContext';
import { isTutorialAtom } from '@util/GlobalState';
import { TABLE_MODALS } from '@util/Constants';

import 'react-toastify/dist/ReactToastify.css';

import TodoTimeInteraction from '@container/main/TodoTimeInteraction';
import TodoStatus from '@container/main/TodoStatus';
import TodoTitle from '@container/main/TodoTitle';
import TodoContents from '@container/main/TodoContents';

import Celebrate from '@images/Celebrate.svg';
import Image from '@components/Image';
import { Link } from 'react-router-dom';
import Text from '@components/Text';

const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const EmptyWrapper = styled.div`
  padding-top: 10vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const { none, create } = TABLE_MODALS;

const Main = (): ReactElement => {
  const isTutorial = useAtomValue(isTutorialAtom);
  const { asyncActiveTodo, isFinishedAtom, modalTypeAtom } = useGlobalAtom();
  const prefix: string = isTutorial ? '/tutorials' : '';
  const [isFinished] = useAtom(isFinishedAtom);
  const [activeTodoAtom] = useAtom(asyncActiveTodo); // -> aync로 activeTodo()
  const [modalType, setModalType] = useAtom(modalTypeAtom);

  useEffect(() => {
    if (modalType !== none) {
      setModalType(none);
    }
  }, []);

  useEffect(() => {
    if (isFinished) {
      toast('오늘 주어진 일을 끝낸 멋진 사람! 😎');
    }
  }, [isFinished]);

  const handleOnClick = (): void => {
    setModalType(create);
  };

  return (
    <Suspense fallback={<div>loading</div>}>
      <Wrapper>
        {activeTodoAtom !== undefined ? (
          <>
            <TodoStatus />
            <TodoTitle />
            <TodoTimeInteraction />
            <TodoContents />
          </>
        ) : (
          <EmptyWrapper>
            <Image src={Celebrate} />
            <div>
              <h1>Todo가 없습니다!</h1>
              <TextWrapper>
                <Link to={`${prefix}/todos`} onClick={handleOnClick}>
                  여기
                </Link>
                <Text text="를 클릭해서 Todo를 추가해보세요" />
              </TextWrapper>
            </div>
          </EmptyWrapper>
        )}
      </Wrapper>
    </Suspense>
  );
};

export default Main;
