import { ReactElement } from 'react';
import styled from 'styled-components';

import Text from '../Text';
import Button from '../Button';

import { PRIMARY_COLORS } from '@util/Constants';
import { FilterType } from '@util/todos.util';

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
  left: 50%;
  z-index: 5;
  transform: translateX(-50%);
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background-color: transparent;
`;

interface FilterProps {
  filter: Set<FilterType>;
  setFilter: React.Dispatch<React.SetStateAction<Set<FilterType>>>;
  setFilterDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const filterOptions: Array<{ text: string; state: 'DONE' | 'READY' | 'WAIT' }> = [
  { text: '작업 가능', state: 'READY' },
  { text: '완료', state: 'DONE' },
  { text: '대기 중', state: 'WAIT' },
];

const FilterBox = ({ filter, setFilter, setFilterDropDown }: FilterProps): ReactElement => {
  return (
    <>
      <Overlay
        onClick={() => {
          setFilterDropDown(false);
        }}
      />
      <StyledFilterBox>
        {filterOptions.map(({ text, state }: { text: string; state: 'DONE' | 'READY' | 'WAIT' }): ReactElement => {
          return (
            <Button
              key={text}
              context={
                <Text
                  text={text}
                  color={filter.has(state) ? blue : gray}
                  fontFamily={'Noto Sans'}
                  fontSize={'18px'}
                  fontWeight={'700'}
                />
              }
              onClick={() => {
                setFilter((prev) => {
                  const newState = new Set([...prev]);
                  if (newState.has(state)) newState.delete(state);
                  else newState.add(state);
                  return newState;
                });
                setFilterDropDown(false);
              }}
            />
          );
        })}
      </StyledFilterBox>
    </>
  );
};

export default FilterBox;
