import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import Image from '../../components/Image';

import DropDown from '../../images/DropDown.svg';
import { PlainTodo } from '@core/todo/todoList.js';

const ContentWrapper = styled.div`
  width: 850px;
  margin: 40px 14px 0 14px;
  text-align: justify;
`;

const ToggleWrapper = styled.div`
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img: hover {
    cursor: pointer;
  }
  input {
    display: none;
  }
  input[id='toggleCheck'] + label img {
    transform: rotate(180deg);
  }
  input[id='toggleCheck']:checked + label img {
    transform: rotate(0deg);
  }
  hr {
    width: 850px;
    margin: 40px 0px 7px 0;
    border: 1px solid #3f3f3f;
    background-color: #3f3f3f;
  }
`;

const TodoContents = ({ activeTodo }: { activeTodo: PlainTodo }): ReactElement => {
  const [isTodoContentToggled, setIsTodoContentToggled] = useState(true);
  const checkHandler = (): void => {
    setIsTodoContentToggled(!isTodoContentToggled);
  };

  return (
    <>
      <ToggleWrapper>
        <input type="checkBox" id="toggleCheck" readOnly={isTodoContentToggled} onClick={checkHandler} />
        <label htmlFor="toggleCheck">
          {isTodoContentToggled ? <></> : <ContentWrapper>{activeTodo.content}</ContentWrapper>}
          <hr />
          <Image src={DropDown} />
        </label>
      </ToggleWrapper>
    </>
  );
};
export default TodoContents;
