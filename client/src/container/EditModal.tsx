import { memo, ReactElement, useRef, Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';

import { MODAL_INPUT_LIST, MODAL_LABEL_ID } from '@util/Constants';
import { editingTodoIdAtom, todoList } from '@util/GlobalState';
import { getDateTimeInputFormatString, getModalValues } from '@util/Common';

import LabeledInput from '@components/todos/LabeledInput';

import Modal from '@components/Modal';
import styled from 'styled-components';
import useModalComplete from '@hooks/useModalComplete';

interface WrapperProps {
  ref: any;
}

const InputWrapper = styled.div<WrapperProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MODAL_EDIT = 'update';

const EditModal = ({ setHasEditModal }: { setHasEditModal: Dispatch<SetStateAction<boolean>> }): ReactElement => {
  const [todoListAtom] = useAtom(todoList);
  const [editingTodoId] = useAtom(editingTodoIdAtom);
  const editModalWrapper = useRef();
  const [setComplete] = useModalComplete(MODAL_EDIT);

  const setInitData = useCallback((): void => {
    todoListAtom
      .getTodoById(editingTodoId)
      .then((target) => {
        if (editModalWrapper.current === undefined || target === undefined) {
          return;
        }
        getModalValues(editModalWrapper.current).forEach((elem) => {
          if (elem.id === 'until') {
            return (elem.value = getDateTimeInputFormatString(new Date(target.until)));
          }
          if (elem.dataset.label === 'search-input') return;

          elem.value = target[elem.id as keyof typeof target];
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [editingTodoId]);

  useEffect(() => {
    setInitData();
  }, []);

  return (
    <Modal modalHeader="할 일 수정하기" setIsModalOpen={setHasEditModal} action={setComplete}>
      <InputWrapper ref={editModalWrapper}>
        {MODAL_INPUT_LIST.map((item) => {
          const { type, label, maxLength, placeHolder } = item;
          return (
            <LabeledInput
              key={`${label}-${type}`}
              id={MODAL_LABEL_ID[label as keyof typeof MODAL_LABEL_ID]}
              label={label}
              maxLength={maxLength}
              type={type}
              placeHolder={placeHolder}
            />
          );
        })}
      </InputWrapper>
    </Modal>
  );
};

export default memo(EditModal);
