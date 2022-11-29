import { PRIMARY_COLORS } from '@util/Constants';
import { ReactElement, memo } from 'react';
import styled from 'styled-components';

const { lightGray, black } = PRIMARY_COLORS;

const StyledSelect = styled.select`
  width: 20%;
  border: 1px solid ${lightGray};
  border-radius: 5px;
  padding: 8px;
  color: ${black};
`;

const Select = ({ options, id }: { options: string[]; id: string }): ReactElement => {
  return (
    <StyledSelect id={id}>
      {options.map((value) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      })}
    </StyledSelect>
  );
};
export default memo(Select);
