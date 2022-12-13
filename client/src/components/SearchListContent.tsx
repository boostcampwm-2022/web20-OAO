import { PlainTodo } from '@todo/todo.type';
import { ReactElement, useMemo } from 'react';
import styled from 'styled-components';

import Text from '@components/Text';
import Image from '@components/Image';
import { getyyyymmddDateFormat } from '@util/Common';
import { PRIMARY_COLORS } from '@util/Constants';
import Search from '@images/Search.svg';

const { gray } = PRIMARY_COLORS;

const SearchTitleWrapper = styled.div`
  flex-grow: 2;
`;
const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  img {
    margin: 0 5px;
  }
  p {
    padding: 5px;
  }
`;

const SearchListContent = ({ todo }: { todo: PlainTodo }): ReactElement => {
  const ListContentElem = useMemo(() => {
    return (
      <ListWrapper>
        <Image src={Search} />
        <SearchTitleWrapper>
          <Text text={todo.title} fontSize={'15px'} />
        </SearchTitleWrapper>
        <Text
          text={'마감날짜 ' + getyyyymmddDateFormat(todo.until, '.')}
          color={gray}
          fontSize={'15px'}
          fontFamily={'SanSerif'}
        />
      </ListWrapper>
    );
  }, [todo]);
  return <>{ListContentElem}</>;
};

export default SearchListContent;
