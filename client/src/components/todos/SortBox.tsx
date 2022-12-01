import { ReactElement } from 'react';
import styled from 'styled-components';

import Text from '../Text';
import Button from '../Button';

import { PRIMARY_COLORS } from '@util/Constants';

const { lightGray, black, blue, gray } = PRIMARY_COLORS;

const StyledSortBox = styled.div`
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

interface SortProps {
  sort: Map<string, 'NONE' | 'ASCEND' | 'DESCEND'>;
  setSort: React.Dispatch<React.SetStateAction<Map<string, 'NONE' | 'ASCEND' | 'DESCEND'>>>;
  setSortDropDown: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}

const filterOptions: Array<{ text: string; direction: 'NONE' | 'ASCEND' | 'DESCEND' }> = [
  { text: '선택안함', direction: 'NONE' },
  { text: '오름차순', direction: 'ASCEND' },
  { text: '내림차순', direction: 'DESCEND' },
];

const updateSort = (
  sort: Map<string, 'NONE' | 'ASCEND' | 'DESCEND'>,
  type: string,
  direction: 'NONE' | 'ASCEND' | 'DESCEND',
): Map<string, 'NONE' | 'ASCEND' | 'DESCEND'> => {
  const newSort = new Map([...sort]);
  if (newSort.has(type)) newSort.delete(type);
  newSort.set(type, direction);
  return newSort;
};

const SortBox = ({ type, sort, setSort, setSortDropDown }: SortProps): ReactElement => {
  return (
    <StyledSortBox>
      {filterOptions.map(
        ({ text, direction }: { text: string; direction: 'NONE' | 'ASCEND' | 'DESCEND' }): ReactElement => {
          return (
            <Button
              key={text}
              context={
                <Text
                  text={text}
                  color={
                    (!sort.has(type) && direction === 'NONE') || (sort.has(type) && sort.get(type) === direction)
                      ? blue
                      : gray
                  }
                  fontFamily={'Noto Sans'}
                  fontSize={'18px'}
                  fontWeight={'700'}
                />
              }
              onClick={() => {
                setSort((prev) => updateSort(prev, type, direction));
                setSortDropDown('');
              }}
            />
          );
        },
      )}
    </StyledSortBox>
  );
};

export default SortBox;
