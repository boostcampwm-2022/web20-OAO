import { ReactElement, useState, memo } from 'react';
import Text from '@components/Text';
import { PRIMARY_COLORS } from '@util/Constants';
import { getTodayDate } from '@util/Common';

import styled from 'styled-components';
import Select from '@components/Select';
import { toast } from 'react-toastify';

const { darkGray, lightGray } = PRIMARY_COLORS;

interface InputProps {
  label: string;
  maxLength: number | string;
  type: string;
  id: string;
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
  > input[type='date'] {
    &:last-child {
      width: 30%;
    }
  }
`;

const LabeledInput = ({ label, maxLength, type, id }: InputProps): ReactElement => {
  const [input, setInput] = useState('');
  const [dateInput, setDateInput] = useState(getTodayDate());

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

    if (getTodayDate() <= value) {
      return setDateInput(value);
    }

    toast.error('새로 생성하는 Todo는 과거로 설정 불가능합니다.');
  };

  return (
    <Wrapper>
      <Text text={label} fontFamily={'SanSerif'} fontSize={'18px'} color={darkGray} fontWeight={'500'} />
      {type === 'text' && <input value={input} onChange={handleOnChangeText} type={type} id={id} />}
      {type === 'textarea' && <textarea id={id} />}
      {type === 'select' && <Select options={['A', 'B', 'C']} id={id} />}
      {type === 'date' && <input type="date" value={dateInput} id={id} onChange={handleOnChangeDate} />}
    </Wrapper>
  );
};

export default memo(LabeledInput);
