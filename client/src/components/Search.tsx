import { PlainTodo } from '@todo/todo.type';
import { INDEX, KEYBOARD_EVENT_KEY, PRIMARY_COLORS } from '@util/Constants';
import { todoList } from '@util/GlobalState';
import { useAtomValue } from 'jotai';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import SearchListContent from './SearchListContent';

const { lightGray } = PRIMARY_COLORS;

interface LiRefList {
  [key: string]: HTMLLIElement;
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
const Ul = styled.ul`
  position: absolute;
  z-index: 110;
  width: 100%;
  margin: 8px 0;
  padding-left: 0px;
  background-color: white;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  overflow: auto;
  max-height: 20vh;
  li:hover {
    cursor: pointer;
    background-color: ${lightGray};
  }
  list-style: none;
`;

const getNowIndexedId = (nowIndex: number, keyName: string, searchTodoList: PlainTodo[]): string => {
  const searchListLastIndex = searchTodoList.length - 1;
  const firstIndex = keyName === KEYBOARD_EVENT_KEY.DOWN ? INDEX.FIRST : searchListLastIndex;
  const lastIndex = keyName === KEYBOARD_EVENT_KEY.DOWN ? searchListLastIndex : INDEX.FIRST;
  const nextDirection = keyName === KEYBOARD_EVENT_KEY.DOWN ? 1 : -1;

  const focusedId =
    nowIndex === INDEX.NOT_FOUND || nowIndex === lastIndex
      ? searchTodoList[firstIndex].id
      : searchTodoList[nowIndex + nextDirection].id;
  return focusedId;
};

const Search = ({ onClick }: { onClick: Function }): ReactElement => {
  const todoListAtom = useAtomValue(todoList);
  const [inputValue, setInputValue] = useState('');
  const [searchTodoList, setSearchTodoList] = useState<PlainTodo[]>([]);
  const [focusedId, setFocusedId] = useState('');
  const liRef = useRef<LiRefList>({});

  useEffect(() => {
    if (inputValue === '') return setSearchTodoList([]);

    todoListAtom
      .getTodoBySearchKeyword(inputValue)
      .then((data: PlainTodo[]) => {
        setSearchTodoList(() => [...data]);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [inputValue]);

  const initSearchBar = (): void => {
    setInputValue('');
    setSearchTodoList([]);
    setFocusedId('');
  };

  const searchBarOnInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const searchBarOnKeyDown = (event: KeyboardEvent): void => {
    if (searchTodoList.length === 0) return;
    const nowIndex = searchTodoList.findIndex((el) => el.id === focusedId);

    if (event.key === KEYBOARD_EVENT_KEY.DOWN || event.key === KEYBOARD_EVENT_KEY.UP) {
      event.preventDefault();
      const focusedId = getNowIndexedId(nowIndex, event.key, searchTodoList);
      setFocusedId(focusedId);
      scrollFocusedIdList(focusedId);
    }
    if (event.key === KEYBOARD_EVENT_KEY.ENTER && focusedId !== '') {
      const selectTodo = searchTodoList.find((el) => el.id === focusedId);
      onClick(selectTodo);
      initSearchBar();
    }
  };

  const scrollFocusedIdList = (todoId: string): void => {
    todoId === ''
      ? liRef.current[searchTodoList[0].id].scrollIntoView({ block: 'center' })
      : liRef.current[todoId].scrollIntoView({ block: 'center' });
  };

  const listOnClick = (selectTodo: PlainTodo): void => {
    onClick(selectTodo);
    initSearchBar();
  };

  return (
    <Wrapper>
      <SearchBar inputValue={inputValue} onInput={searchBarOnInput} onKeyDown={searchBarOnKeyDown} />
      <Ul style={{ border: searchTodoList.length === 0 ? 'none' : '' }}>
        {searchTodoList.map((todo) => {
          return (
            <li
              key={todo.id}
              ref={(el) => {
                if (el !== null) {
                  liRef.current[todo.id] = el;
                }
              }}
              style={{ backgroundColor: focusedId === todo.id ? lightGray : '' }}
              onClick={() => listOnClick(todo)}
            >
              <SearchListContent todo={todo} />
            </li>
          );
        })}
      </Ul>
    </Wrapper>
  );
};

export default Search;
