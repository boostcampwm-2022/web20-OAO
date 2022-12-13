import { ReactElement, useState } from 'react';
import styled from 'styled-components';

import { PRIMARY_COLORS } from '@util/Constants';

import Text from '@components/Text';
import Button from '@components/Button';
import FilterBox from '@components/todos/FilterBox';
import SortBox from '@components/todos/SortBox';

const { lightGray } = PRIMARY_COLORS;
interface Props {
  filter: 'DONE' | 'READY' | 'WAIT';
  setFilter: React.Dispatch<React.SetStateAction<'DONE' | 'READY' | 'WAIT'>>;
  sort: Map<string, 'NONE' | 'ASCEND' | 'DESCEND'>;
  setSort: React.Dispatch<React.SetStateAction<Map<string, 'NONE' | 'ASCEND' | 'DESCEND'>>>;
}

const GridWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3fr 1fr 2fr 1fr 2fr 2fr 2fr;
  border-bottom: 2px solid ${lightGray};
  text-align: center;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 5;
  p {
    margin: 10px 0;
  }
`;

const TableHeaderUnit = ({
  type,
  sort,
}: {
  type: string;
  sort: Map<string, 'NONE' | 'ASCEND' | 'DESCEND'>;
}): ReactElement => {
  const index = [...sort]
    .filter((el) => el[1] !== 'NONE')
    .map((el) => el[0])
    .reverse()
    .findIndex((el) => el === type);
  const color = ['#1D1D1D', '#888888', '#CCCCCC'];
  const getSortSymbol = (type: string): string => {
    if (sort.has(type)) {
      if (sort.get(type) === 'ASCEND') return '▲';
      if (sort.get(type) === 'DESCEND') return '▼';
    }
    return '';
  };
  const typeMap = {
    title: '제목',
    importance: '중요도',
    until: '마감일',
  };
  return (
    <>
      <span style={{ color: `${color[index]}` }}>{getSortSymbol(type)}</span>
      <span>{typeMap[type as keyof typeof typeMap]}</span>
    </>
  );
};

const TableHeader = ({ filter, setFilter, sort, setSort, ...props }: Props): ReactElement => {
  const [filterDropdown, setFilterDropdown] = useState<boolean>(false);
  const [sortDropdown, setSortDropdown] = useState<string>('');

  return (
    <GridWrapper>
      <div></div>
      <div style={{ position: 'relative' }}>
        <Button
          onClick={() => {
            setFilterDropdown(() => false);
            setSortDropdown((prev) => (prev === 'title' ? '' : 'title'));
          }}
        >
          <Text text={''} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'left'}>
            <TableHeaderUnit type={'title'} sort={sort} />
          </Text>
        </Button>
        {sortDropdown === 'title' && (
          <SortBox sort={sort} setSort={setSort} setSortDropDown={setSortDropdown} type={'title'} />
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <Button
          onClick={() => {
            setFilterDropdown((prev) => !prev);
            setSortDropdown(() => '');
          }}
        >
          <Text text={'상태'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'center'} />
        </Button>
        {filterDropdown && <FilterBox filter={filter} setFilter={setFilter} setFilterDropDown={setFilterDropdown} />}
      </div>
      <div style={{ position: 'relative' }}>
        <Button
          onClick={() => {
            setFilterDropdown(() => false);
            setSortDropdown((prev) => (prev === 'until' ? '' : 'until'));
          }}
        >
          <Text text={''} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'left'}>
            <TableHeaderUnit type={'until'} sort={sort} />
          </Text>
        </Button>
        {sortDropdown === 'until' && (
          <SortBox sort={sort} setSort={setSort} setSortDropDown={setSortDropdown} type={'until'} />
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <Button
          onClick={() => {
            setFilterDropdown(() => false);
            setSortDropdown((prev) => (prev === 'importance' ? '' : 'importance'));
          }}
        >
          <Text text={''} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'left'}>
            <TableHeaderUnit type={'importance'} sort={sort} />
          </Text>
        </Button>
        {sortDropdown === 'importance' && (
          <SortBox sort={sort} setSort={setSort} setSortDropDown={setSortDropdown} type={'importance'} />
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <Text text={'먼저 할 일'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'center'} />
      </div>
      <div style={{ position: 'relative' }}>
        <Text text={'이어서 할 일'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'center'} />
      </div>
      <div></div>
    </GridWrapper>
  );
};

export default TableHeader;
