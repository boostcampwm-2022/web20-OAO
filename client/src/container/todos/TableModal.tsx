import { memo, ReactElement, useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import { TABLE_MODALS, PRIMARY_COLORS, MODAL_INPUT_LIST, MODAL_LABEL_ID } from '@util/Constants';
import { modalTypeAtom, todoList, editingTodoIdAtom } from '@util/GlobalState';
import { getModalValues, getDateTimeInputFormatString } from '@util/Common';

import LabeledInput from '@components/todos/LabeledInput';
import Button from '@components/Button';
import Text from '@components/Text';
import { toast } from 'react-toastify';
import { TodoList } from '@core/todo/todoList';
import { InputTodo } from '@todo/todo.type';

import 'react-toastify/dist/ReactToastify.css';

const { create, update, none } = TABLE_MODALS;
const { offWhite, red, blue, darkGray, lightGray } = PRIMARY_COLORS;

interface WrapperProps {
  ref: any;
}

interface ModalValues {
  id: string;
  value: string;
  dataset: { label: string; id: string };
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

const validateUuid = (uuid: string): boolean => {
  const regex = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
  if (!regex.test(uuid)) throw new Error('먼저 할 일 또는 나중에 할 일의 id값이 올바르지 않습니다');
  return true;
};

const validateCircularReference = (idList: string[], checkId: string): boolean => {
  return idList.some((id) => id === checkId);
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
          if (elem.dataset.label === 'search-input') return;

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
      const prevTodoIdList: string[] = [];
      const nextTodoIdList: string[] = [];
      getModalValues(modalWrapper.current).forEach((item) => {
        const { id, value, dataset }: ModalValues = item;

        if (id === 'title' && value === '') {
          throw new Error('제목은 필수 값입니다!');
        }
        if (id === 'until') {
          return (newData = { ...newData, [id]: new Date(value) });
        }
        if (dataset.label === 'prev' || dataset.label === 'next') {
          if (dataset.id === editingTodoId)
            throw new Error('수정하고 있는 할 일은 먼저 할 일과 나중에 할 일에 들어갈 수 없습니다');
          if (modalType === update) validateUuid(dataset.id);
          const isprevIdCircularReference =
            dataset.label === 'prev'
              ? validateCircularReference(nextTodoIdList, dataset.id)
              : validateCircularReference(prevTodoIdList, dataset.id);
          if (isprevIdCircularReference)
            throw new Error(
              `먼저 할 일과 나중에 할 일에는 같은 할 일이 올 수 없습니다. 둘 중 하나에서 "${value}" 지워주세요`,
            );
          return dataset.label === 'prev' ? prevTodoIdList.push(dataset.id) : nextTodoIdList.push(dataset.id);
        }
        newData = { ...newData, [id]: value };
      });
      newData = { ...newData, prev: prevTodoIdList, next: nextTodoIdList };

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

  return (
    <Wrapper ref={modalWrapper}>
      <Text text={modalHeader} fontFamily={'SanSerif'} fontSize={'24px'} fontWeight={'600'} />
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
