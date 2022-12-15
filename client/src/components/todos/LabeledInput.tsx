import { ReactElement, useState, memo, ChangeEvent } from 'react';
import styled from 'styled-components';

import { MAX_DATE, PRIMARY_COLORS } from '@util/Constants';
import { getDateTimeInputFormatString, getTodayDate } from '@util/Common';

import Text from '@components/Text';
import Select from '@components/Select';
import RelatedTodoInput from './RelatedTodoInput';

const { darkGray, lightGray, red } = PRIMARY_COLORS;

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
  const [warning, setWarning] = useState('');

  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setWarning('');
    const { value } = e.target;

    if (value.match(/[.*+?^${}()|[\]\\]/) !== null) {
      setWarning('특수문자 .*+?^${}()는 제목에 입력할 수 없습니다.');
    }
    if (maxLength === Number.MAX_VALUE || maxLength < 0) {
      return setInput(value);
    }
    if (maxLength > value.length) {
      return setInput(value);
    }
    setWarning('제목은 50자 이상 입력 불가능합니다.');
  };

  const handleOnChangeDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setWarning('');
    if (editingTodoId === undefined && getTodayDate() > value) {
      setWarning('새로 생성하는 할 일는 과거로 설정 불가능합니다.');
    }
    return setDateInput(value);
  };

  const handleOnChangeSearchKeyword = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setWarning('');
    if (value.match(/[.*+?^${}()|[\]\\]/) !== null) {
      setWarning('특수문자 .*+?^${}()는 검색할 수 없습니다');
    }
  };

  const blockUntilDateAtCreateMode = (): string => {
    if (editingTodoId === undefined) {
      return getTodayDate();
    } else return '';
  };

  return (
    <Wrapper>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
        <Text text={label} fontFamily={'SanSerif'} fontSize={'18px'} color={darkGray} fontWeight={'500'} />
        <Text text={warning} fontFamily={'SanSerif'} fontSize={'12px'} color={red} fontWeight={'400'} />
      </div>
      {type === 'text' && (
        <input value={input} onChange={handleOnChangeText} type={type} id={id} placeholder={placeHolder} autoFocus />
      )}
      {type === 'textarea' && <textarea id={id} placeholder={placeHolder} />}
      {type === 'search-prev' && (
        <RelatedTodoInput relatedType={'prev'} editingTodoId={editingTodoId} onChange={handleOnChangeSearchKeyword} />
      )}
      {type === 'search-next' && (
        <RelatedTodoInput relatedType={'next'} editingTodoId={editingTodoId} onChange={handleOnChangeSearchKeyword} />
      )}
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
