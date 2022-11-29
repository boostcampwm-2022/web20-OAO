import { ReactElement } from 'react';
import Text from '@components/Text';

const TableHeader = (): ReactElement => {
  return (
    <>
      <div></div>
      <Text text={'제목'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'left'} />
      <Text text={'상태'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'center'} />
      <Text text={'마감일'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'center'} />
      <Text text={'중요도'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'center'} />
      <Text text={'먼저 할 일'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'center'} />
      <Text text={'이어서 할 일'} fontFamily={'Noto Sans'} fontWeight={'700'} textAlign={'center'} />
      <div></div>
    </>
  );
};

export default TableHeader;
