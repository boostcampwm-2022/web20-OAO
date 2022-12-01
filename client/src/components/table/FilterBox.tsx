import { memo, ReactElement } from 'react';
import styled from 'styled-components';

import Text from '../Text';
import Button from '../Button';

import { PRIMARY_COLORS } from '@util/Constants';

const { lightGray, black } = PRIMARY_COLORS;

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
  width: 161px;
  padding: 20px;
  gap: 20px;
  position: absolute;
  left: 40px;
  top: 60px;
`;

interface FilterProps {
  setPostpone: Function;
  postponeOptions: string[];
  time: number;
  setTime: Function;
  handleOnToggle: Function;
}

const filterOptions = ['설정 안함', '내림차순', '오름차순'];

const FilterBox = (props: FilterProps): ReactElement => {
  return (
    <StyledFilterBox>
      {filterOptions.map((text: string): ReactElement => {
        return (
          <Button
            key={text}
            context={<Text text={text} color={black} fontFamily={'Noto Sans'} fontSize={'18px'} fontWeight={'700'} />}
            onClick={() => {
              console.log(`clicked: ${text}`);
            }}
          />
        );
      })}
    </StyledFilterBox>
  );
};
export default memo(FilterBox);
