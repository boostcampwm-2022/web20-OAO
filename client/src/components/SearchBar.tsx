import { ReactElement, useState } from 'react';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';

import { PlainTodo } from '@todo/todo.type';
import { todoList } from '@util/GlobalState';
import Search from '@images/Search.svg';

import Text from '@components/Text';
import Image from '@components/Image';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';
import { getyyyymmddDateFormat } from '@util/Common';

const { lightGray, gray } = PRIMARY_COLORS;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Ul = styled.ul`
  list-style: none;
  padding-left: 0px;
  margin: 8px 0;
`;

const SearchTitleWrapper = styled.div`
  flex-grow: 2;
`;

const UlWrapper = styled.div`
  position: absolute;
  z-index: 110;
  width: 100%;
  margin: 10px 0;
  background-color: white;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  overflow: scroll;
  height: 20vh;
  li:hover {
    cursor: pointer;
    background-color: ${lightGray};
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 5px 0;

  img {
    margin: 0 5px;
  }
  p {
    padding: 5px;
  }
`;

const InputWrapper = styled(ListWrapper)`
  display: flex;
  justify-content: center;
  background: white;
  border: 1px solid ${lightGray};
  border-radius: 5px;
  padding: 3px 0;
`;

const SearchBar = ({ onClick, onChange }: { onClick: Function; onChange?: Function }): ReactElement => {
  const todoListAtom = useAtomValue(todoList);
  const [searchTodoList, setSearchTodoList] = useState<PlainTodo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const inputEventPromiseWrapper = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onInput(event)
      .then(() => {})
      .catch(() => {});
  };

  const onInput = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setInputValue(event.target.value);

    if (event.target.value.length === 0) return setSearchTodoList([]);

    return await todoListAtom
      .getTodoBySearchKeyword(event.target.value)
      .then((data: PlainTodo[]) => {
        setSearchTodoList(() => [...data]);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const listOnClick = (selectTodo: PlainTodo): void => {
    setInputValue('');
    setSearchTodoList([]);
    onClick(selectTodo);
  };

  return (
    <Wrapper>
      <InputWrapper>
        <Image src={Search} />
        <input
          type="search"
          data-label="search-input"
          value={inputValue}
          onClick={() => onChange}
          onInput={inputEventPromiseWrapper}
          style={{
            border: 'none',
          }}
        />
      </InputWrapper>
      {searchTodoList.length > 0 && (
        <UlWrapper>
          <Ul>
            {searchTodoList.map((todo: PlainTodo) => {
              return (
                <li key={todo.id}>
                  <ListWrapper onClick={() => listOnClick(todo)}>
                    <Image src={Search} />
                    <SearchTitleWrapper>
                      <Text text={todo.title} fontSize={'15px'} fontFamily={'SanSerif'} />
                    </SearchTitleWrapper>
                    <Text
                      text={'마감날짜 ' + getyyyymmddDateFormat(todo.until, '.')}
                      color={gray}
                      fontSize={'15px'}
                      fontFamily={'SanSerif'}
                    />
                  </ListWrapper>
                </li>
              );
            })}
          </Ul>
        </UlWrapper>
      )}
    </Wrapper>
  );
};

export default SearchBar;
