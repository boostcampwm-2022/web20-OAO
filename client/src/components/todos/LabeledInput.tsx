import { ReactElement, useState, memo } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { MAX_DATE, PRIMARY_COLORS } from '@util/Constants';
import { getDateTimeInputFormatString, getTodayDate } from '@util/Common';

import Text from '@components/Text';
import Select from '@components/Select';
import RelatedTodoInput from './RelatedTodoInput';

const { darkGray, lightGray } = PRIMARY_COLORS;

interface InputProps {
  label: string;
  maxLength: number | string;
  type: string;
  id: string;
  placeHolder: string;
  editingTodoId?: string;
}

const Wrapper = styled.div`
  width: 100%;

  & {
    width: 100%;
    gap: 5px;
  }
  > *:focus {
    outline: 1px solid ${darkGray};
  }
  > input,
  textarea,
  select {
    padding: 8px;
    border: 1px solid ${lightGray};
    border-radius: 5px;
    color: ${darkGray};
  }
  > input[type='text'],
  textarea {
    &:last-child {
      width: 100%;
    }
  }
  > input[type='datetime-local'] {
    &:last-child {
      width: 30%;
    }
  }
`;

const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

const LabeledInput = ({ label, maxLength, type, id, placeHolder, editingTodoId }: InputProps): ReactElement => {
  const [input, setInput] = useState('');
  const [dateInput, setDateInput] = useState(getDateTimeInputFormatString(tomorrow));

  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    if (maxLength === Number.MAX_VALUE || maxLength < 0) {
      return setInput(value);
    }
    if (maxLength > value.length) {
      return setInput(value);
    }
    toast.error('제목은 50자 이상 입력 불가능합니다.');
  };

  const handleOnChangeDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (editingTodoId === undefined && getTodayDate() > value) {
      toast.error('새로 생성하는 할 일는 과거로 설정 불가능합니다.');
    }
    return setDateInput(value);
  };

  const blockUntilDateAtCreateMode = (): string => {
    if (editingTodoId === undefined) {
      return getTodayDate();
    } else return '';
  };

  return (
    <Wrapper>
      <Text text={label} fontFamily={'SanSerif'} fontSize={'18px'} color={darkGray} fontWeight={'500'} />
      {type === 'text' && (
        <input value={input} onChange={handleOnChangeText} type={type} id={id} placeholder={placeHolder} autoFocus />
      )}
      {type === 'textarea' && <textarea id={id} placeholder={placeHolder} />}
      {type === 'search-prev' && <RelatedTodoInput relatedType={'prev'} editingTodoId={editingTodoId} />}
      {type === 'search-next' && <RelatedTodoInput relatedType={'next'} editingTodoId={editingTodoId} />}
      {type === 'select' && <Select options={['A', 'B', 'C']} id={id} />}
      {type === 'datetime-local' && (
        <input
          type="datetime-local"
          value={dateInput}
          id={id}
          onChange={handleOnChangeDate}
          min={blockUntilDateAtCreateMode()}
          max={MAX_DATE}
        />
      )}
    </Wrapper>
  );
};

export default memo(LabeledInput);
