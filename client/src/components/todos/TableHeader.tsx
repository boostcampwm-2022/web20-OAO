import { ReactElement, useState } from 'react';
import Text from '@components/Text';
import Button from '@components/Button';
import FilterBox from '@components/todos/FilterBox';

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<'DONE' | 'READY' | 'WAIT'>>;
  setSort: React.Dispatch<React.SetStateAction<Array<Map<string, string>>>>;
}

const TableHeader = ({ setFilter, setSort, ...props }: Props): ReactElement => {
  const [filterDropdown, setFilterDropdown] = useState<boolean>(false);
  const [sortDropdown, setSortDropdown] = useState<string>('');

  return (
    <>
      <div></div>
      <div>
        <Text text={'제목'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'left'} />
      </div>
      <div>
        <Button
          onClick={() => {
            setFilterDropdown(true);
          }}
        >
          <Text text={'상태'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'center'} />
        </Button>
        {filterDropdown && <FilterBox setFilter={setFilter} setFilterDropDown={setFilterDropdown} />}
      </div>
      <div>
        <Text text={'마감일'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'center'} />
      </div>
      <div>
        <Text text={'중요도'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'center'} />
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
