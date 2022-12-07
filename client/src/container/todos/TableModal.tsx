import { memo, ReactElement, useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import { TABLE_MODALS, PRIMARY_COLORS, MODAL_INPUT_LIST, MODAL_LABEL_ID } from '@util/Constants';
import { modalTypeAtom, todoList, editingTodoIdAtom } from '@util/GlobalState';
import { copyToClipboard, getModalValues, getDateTimeInputFormatString } from '@util/Common';

import LabeledInput from '@components/todos/LabeledInput';
import Button from '@components/Button';
import Text from '@components/Text';
import { toast } from 'react-toastify';
import { TodoList } from '@core/todo/todoList';
import { InputTodo } from '@todo/todo.type';

import Copy from '@images/Copy.svg';

import 'react-toastify/dist/ReactToastify.css';

const { create, update, none } = TABLE_MODALS;
const { offWhite, red, blue, darkGray, lightGray } = PRIMARY_COLORS;

interface WrapperProps {
  ref: any;
}

const Wrapper = styled.div<WrapperProps>`
  width: 50vw;
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

  input {
    width: 100%;
    color: ${darkGray};
    font-family: 'SanSerif';
    font-size: 15px;
    padding: 5px;
    border: 1px solid ${lightGray};
    border-radius: 5px;
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  padding-top: 15px;
  text-align: right;
  justify-content: flex-end;
`;

const StyledIdWrapper = styled.div`
  position: relative;
  width: 100%;
  gap: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  color: ${darkGray};
  font-family: 'SanSerif';
  font-size: 15px;
  padding: 5px;
  border: 1px solid ${lightGray};
  border-radius: 5px;
  outline: none;
`;

const StyledCopyButton = styled(Button)`
  display: flex;
  justify-content: center;
  img {
    width: 32px;
    height: 32px;
  }
`;

const MODAL_COMPLETE_ACTIONS = {
  create: async (todoList: TodoList, newData: InputTodo) => {
    return await todoList.add(newData);
  },
  update: async (todoList: TodoList, newData: InputTodo, id: string) => {
    return await todoList.edit(id, newData);
  },
};

const complete = (setComplete: Function): void => {
  setComplete()
    .then(() => {})
    .catch(() => {});
};

const TableModal = (): ReactElement => {
  const [modalType, setModalType] = useAtom(modalTypeAtom);
  const [todoListAtom, setTodoListAtom] = useAtom(todoList);
  const [modalHeader, setModalHeader] = useState('');
  const [editingTodoId] = useAtom(editingTodoIdAtom);

  const modalWrapper = useRef<HTMLInputElement>();

  const setInitData = useCallback((): void => {
    todoListAtom
      .getTodoById(editingTodoId)
      .then((target) => {
        if (modalWrapper.current === undefined || target === undefined) {
          return;
        }

        getModalValues(modalWrapper.current).forEach((elem) => {
          if (elem.id === 'until') {
            return (elem.value = getDateTimeInputFormatString(new Date(target.until)));
          }
          elem.value = target[elem.id as keyof typeof target];
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [editingTodoId]);

  useEffect(() => {
    if (modalType === create) {
      return setModalHeader('할 일 추가하기');
    }
    if (modalType === update) {
      setInitData();
      return setModalHeader('할 일 수정하기');
    }
    setModalHeader(none);
  }, [modalType]);

  const setComplete = async (): Promise<void> => {
    if (modalWrapper.current === undefined) {
      return;
    }
    try {
      let newData = {};
      getModalValues(modalWrapper.current).forEach((item) => {
        const { id, value } = item;
        if (id === 'title' && value === '') {
          throw new Error('제목은 필수값입니다!');
        }
        if (id === 'prev' || id === 'next') {
          const uuidArray = uuidSeriesTextToUuidArray(value);
          const validateUuidArray = validatePrevAndNextId(uuidArray);
          if (validateUuidArray) {
            return (newData = { ...newData, [id]: uuidArray });
          }
        }
        if (id === 'until') {
          return (newData = { ...newData, [id]: new Date(value) });
        }
        newData = { ...newData, [id]: value };
      });

      const data = await MODAL_COMPLETE_ACTIONS[modalType as keyof typeof MODAL_COMPLETE_ACTIONS](
        todoListAtom,
        newData,
        editingTodoId,
      );
      setTodoListAtom(data);
      setModalType(none);
      toast.success('완료되었습니다! ☘️');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const setCancel = (): void => {
    setModalType(none);
  };

  const validatePrevAndNextId = (uuidArray: string[]): boolean => {
    const regex = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
    if (uuidArray.length > 0) {
      uuidArray.forEach((uuid: string) => {
        if (!regex.test(uuid)) throw new Error('id가 올바르지 않게 입력되었습니다');
      });
    } else {
      return true;
    }
    return true;
  };

  const uuidSeriesTextToUuidArray = (uuidSeriesText: string): string[] => {
    return uuidSeriesText
      .replaceAll('\n', '')
      .replaceAll(' ', '')
      .split(',')
      .filter((id: string) => id !== '');
  };

  return (
    <Wrapper ref={modalWrapper}>
      <Text text={modalHeader} fontFamily={'SanSerif'} fontSize={'24px'} fontWeight={'600'} />
      {modalType === update && (
        <StyledIdWrapper>
          <Text text="id" fontFamily={'SanSerif'} fontSize={'18px'} fontWeight={'500'} color={darkGray} />
          <Container>
            <Text text={editingTodoId} />
            <StyledCopyButton
              context={<img src={Copy} />}
              onClick={() => {
                copyToClipboard(editingTodoId);
              }}
            />
          </Container>
        </StyledIdWrapper>
      )}
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
      <ButtonWrapper>
        <Button context={<Text text="취소" color={red} fontWeight={'700'} fontSize={'18px'} />} onClick={setCancel} />
        <Button
          context={<Text text="확인" color={blue} fontWeight={'700'} fontSize={'18px'} />}
          onClick={() => complete(setComplete)}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default memo(TableModal);
