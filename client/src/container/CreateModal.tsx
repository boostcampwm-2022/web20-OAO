import { memo, ReactElement, Dispatch, SetStateAction } from 'react';

import { MODAL_INPUT_LIST, MODAL_LABEL_ID } from '@util/Constants';
import LabeledInput from '@components/todos/LabeledInput';

import Modal from '@components/Modal';
import styled from 'styled-components';
import useModalComplete from '@hooks/useModalComplete';

const InputWrapper = styled.div`
  width: 100%;
`;

const MODAL_CREATE = 'create';

const CreateModal = ({ setHasCreateModal }: { setHasCreateModal: Dispatch<SetStateAction<boolean>> }): ReactElement => {
  const [setComplete] = useModalComplete(MODAL_CREATE);

  return (
    <Modal modalHeader="할 일 추가하기" setIsModalOpen={setHasCreateModal} action={setComplete}>
      <InputWrapper>
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

export default memo(CreateModal);
