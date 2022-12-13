import { FormEventHandler, ReactElement } from 'react';
import styled from 'styled-components';

import Search from '@images/Search.svg';

import Image from '@components/Image';
import { PRIMARY_COLORS } from '@util/Constants';

const { lightGray } = PRIMARY_COLORS;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 5px 0;
  padding: 3px 0;

  background: white;
  border: 1px solid ${lightGray};
  border-radius: 5px;

  img {
    margin: 0 5px;
  }
  p {
    padding: 5px;
  }
`;

const SearchBar = ({
  inputValue,
  onInput,
  onKeyDown,
}: {
  inputValue: string;
  onInput: FormEventHandler<HTMLInputElement>;
  onKeyDown: Function;
}): ReactElement => {
  return (
    <InputWrapper>
      <Image src={Search} />
      <input
        type="search"
        data-label="search-input"
        value={inputValue}
        onInput={onInput}
        style={{
          border: 'none',
        }}
        onKeyDown={(e) => onKeyDown(e)}
      />
    </InputWrapper>
  );
};

export default SearchBar;
