import { PlainTodo } from '@todo/todo.type';
import { ReactElement, useMemo } from 'react';
import styled from 'styled-components';

import Image from '@components/Image';
import { getyyyymmddDateFormat } from '@util/Common';
import Search from '@images/Search.svg';

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

const ListText = styled.p`
  color: gray;
  font-size: '15px';
`;

const SearchListContent = ({ todo }: { todo: PlainTodo }): ReactElement => {
  const decorateTextDoneTodo = todo.state === 'DONE' ? 'line-through' : '';
  const ListContentElem = useMemo(() => {
    return (
      <ListWrapper>
        <Image src={Search} />
        <SearchTitleWrapper>
          <p style={{ fontSize: '15px', textDecoration: decorateTextDoneTodo }}>{todo.title}</p>
        </SearchTitleWrapper>
        <ListText>마감날짜 {getyyyymmddDateFormat(todo.until, '.')}</ListText>
      </ListWrapper>
    );
  }, [todo]);
  return <>{ListContentElem}</>;
};

export default SearchListContent;
