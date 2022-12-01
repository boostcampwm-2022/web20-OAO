import { ReactElement, useState } from 'react';
import Text from '@components/Text';
import Button from '@components/Button';
import FilterBox from '@components/todos/FilterBox';
import SortBox from '@components/todos/SortBox';

interface Props {
  filter: 'DONE' | 'READY' | 'WAIT';
  setFilter: React.Dispatch<React.SetStateAction<'DONE' | 'READY' | 'WAIT'>>;
  sort: Map<string, 'NONE' | 'ASCEND' | 'DESCEND'>;
  setSort: React.Dispatch<React.SetStateAction<Map<string, 'NONE' | 'ASCEND' | 'DESCEND'>>>;
}

const TableHeader = ({ filter, setFilter, sort, setSort, ...props }: Props): ReactElement => {
  const [filterDropdown, setFilterDropdown] = useState<boolean>(false);
  const [sortDropdown, setSortDropdown] = useState<string>('');
  const getSortSymbol = (type: string): string => {
    if (sort.has(type)) {
      if (sort.get(type) === 'ASCEND') return '▲';
      if (sort.get(type) === 'DESCEND') return '▼';
    }
    return '';
  };

  return (
    <>
      <div></div>
      <div>
        <Button
          onClick={() => {
            setFilterDropdown(() => false);
            setSortDropdown((prev) => (prev === 'title' ? '' : 'title'));
          }}
        >
          <Text text={`${getSortSymbol('title')}제목`} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'left'} />
        </Button>
        {sortDropdown === 'title' && (
          <SortBox sort={sort} setSort={setSort} setSortDropDown={setSortDropdown} type={'title'} />
        )}
      </div>
      <div>
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
      <div>
        <Button
          onClick={() => {
            setFilterDropdown(() => false);
            setSortDropdown((prev) => (prev === 'until' ? '' : 'until'));
          }}
        >
          <Text
            text={`${getSortSymbol('until')}마감일`}
            fontFamily={'Noto Sans'}
            fontWeight={'700'}
            textAlign={'center'}
          />
        </Button>
        {sortDropdown === 'until' && (
          <SortBox sort={sort} setSort={setSort} setSortDropDown={setSortDropdown} type={'until'} />
        )}
      </div>
      <div>
        <Button
          onClick={() => {
            setFilterDropdown(() => false);
            setSortDropdown((prev) => (prev === 'importance' ? '' : 'importance'));
          }}
        >
          <Text
            text={`${getSortSymbol('importance')}중요도`}
            fontFamily={'Noto Sans'}
            fontWeight={'700'}
            textAlign={'center'}
          />
        </Button>
        {sortDropdown === 'importance' && (
          <SortBox sort={sort} setSort={setSort} setSortDropDown={setSortDropdown} type={'importance'} />
        )}
      </div>
      <div>
        <Text text={'먼저 할 일'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'center'} />
      </div>
      <div>
        <Text text={'이어서 할 일'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'center'} />
      </div>
      <div></div>
    </>
  );
};

export default TableHeader;
