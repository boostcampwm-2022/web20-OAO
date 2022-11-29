import { memo, ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import { TABLE_MODALS, PRIMARY_COLORS, MODAL_INPUT_LIST, MODAL_LABEL_ID } from '@util/Constants';
import { modalTypeAtom, todoList } from '@util/GlobalState';
import { getModalValues } from '@util/Common';

import LabeledInput from '@components/todos/LabeledInput';
import Button from '@components/Button';
import Text from '@components/Text';
import { toast } from 'react-toastify';

const { create, update, none } = TABLE_MODALS;
const { offWhite, red, blue } = PRIMARY_COLORS;

interface WrapperProps {
  ref: any;
}

const Wrapper = styled.div<WrapperProps>`
  width: 50vw;
  height: 70vh;
  left: 21vw;
  position: absolute;
  background-color: ${offWhite};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  gap: 10px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  padding-top: 15px;
  text-align: right;
  justify-content: flex-end;
`;

const TableModal = (): ReactElement => {
  const [modalType, setModalType] = useAtom(modalTypeAtom);
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);
  const [modalHeader, setModalHeader] = useState('');
  const modalWrapper = useRef<HTMLInputElement>();

  useEffect(() => {
    if (modalType === create) {
      return setModalHeader('할 일 추가하기');
    }
    if (modalType === update) {
      return setModalHeader('할 일 수정하기');
    }
    setModalHeader(none);
  }, [modalType]);

  const setComplete = (): void => {
    if (modalWrapper.current === undefined) {
      return;
    }
    let newData = {};
    const userInputs = getModalValues(modalWrapper.current);

    userInputs.forEach((item) => {
      const { id, value } = item;
      newData = { ...newData, [id]: value };
    });

    todoListAtom
      .add(newData)
      .then((data) => {
        setTodoListAtom(data);
        setModalType(none);
        toast.success('추가되었습니다! ☘️');
      })
      .catch((err) => {
        toast.error('todo 추가 실패!');
        throw new Error(err);
      });
  };

  const setCancel = (): void => {
    setModalType(none);
  };

  return (
    <Wrapper ref={modalWrapper}>
      <Text text={modalHeader} fontFamily={'SanSerif'} fontSize={'24px'} fontWeight={'600'} />
      {MODAL_INPUT_LIST.map((item) => {
        const { type, label, maxLength } = item;
        return (
          <LabeledInput
            key={`${label}-${type}`}
            id={MODAL_LABEL_ID[label as keyof typeof MODAL_LABEL_ID]}
            label={label}
            maxLength={maxLength}
            type={type}
          />
        );
      })}
      <ButtonWrapper>
        <Button context={<Text text="취소" color={red} fontWeight={'700'} fontSize={'18px'} />} onClick={setCancel} />
        <Button
          context={<Text text="확인" color={blue} fontWeight={'700'} fontSize={'18px'} />}
          onClick={setComplete}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default memo(TableModal);
