import { ReactElement } from 'react';
import styled from 'styled-components';

import Text from '../Text';
import Button from '../Button';

import { PRIMARY_COLORS } from '@util/Constants';

const { lightGray, gray, blue } = PRIMARY_COLORS;

const StyledFilterBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${lightGray};
  line-height: 25px;
  letter-spacing: 0em;
  align-items: flex-start;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: max-content;
  padding: 20px;
  gap: 20px;
  position: absolute;
`;

interface FilterProps {
  filter: 'DONE' | 'READY' | 'WAIT';
  setFilter: React.Dispatch<React.SetStateAction<'DONE' | 'READY' | 'WAIT'>>;
  setFilterDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const filterOptions: Array<{ text: string; state: 'DONE' | 'READY' | 'WAIT' }> = [
  { text: '작업 가능', state: 'READY' },
  { text: '완료', state: 'DONE' },
  { text: '대기 중', state: 'WAIT' },
];

const FilterBox = ({ filter, setFilter, setFilterDropDown }: FilterProps): ReactElement => {
  return (
    <StyledFilterBox>
      {filterOptions.map(({ text, state }: { text: string; state: 'DONE' | 'READY' | 'WAIT' }): ReactElement => {
        return (
          <Button
            key={text}
            context={
              <Text
                text={text}
                color={filter === state ? blue : gray}
                fontFamily={'Noto Sans'}
                fontSize={'18px'}
                fontWeight={'700'}
              />
            }
            onClick={() => {
              setFilter(state);
              setFilterDropDown(false);
            }}
          />
        );
      })}
    </StyledFilterBox>
  );
};

export default FilterBox;
