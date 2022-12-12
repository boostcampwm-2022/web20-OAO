import { ReactElement, memo } from 'react';
import PopUp from '@components/diagram/PopUp';
import Button from '@components/Button';
import Update from '@images/Update.svg';
import Path from '@images/Path.svg';
import Delete from '@images/Delete.svg';
import { useGlobalAtom } from '@util/GlobalAtomContext';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

const TodoBlockPopUp = ({ id, x, y }: { id: string; x: number; y: number }): ReactElement => {
  const { todoList: todoListAtom } = useGlobalAtom();

  const [todoList, setTodoList] = useAtom(todoListAtom);
  return (
    <PopUp x={x} y={y}>
      <Button
        context={<img src={Update} width="40px" height="40px" />}
        onClick={(e) => {
          console.log('update');
        }}
      />
      <Button
        context={<img src={Path} width="40px" height="40px" />}
        onClick={(e) => {
          console.log('new path');
        }}
      />
      <Button
        context={<img src={Delete} width="40px" height="40px" />}
        onClick={() => {
          todoList
            .remove(id)
            .then(async (newTodoList) => {
              setTodoList(newTodoList);
              toast.success('Todo가 성공적으로 삭제되었습니다.');
            })
            .catch((err) => toast.error(err));
        }}
      />
    </PopUp>
  );
};

export default memo(TodoBlockPopUp);
