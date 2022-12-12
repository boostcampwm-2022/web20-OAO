import { ReactElement, memo } from 'react';
import PopUp from '@components/diagram/PopUp';
import Button from '@components/Button';
import Delete from '@images/Delete.svg';
import { useGlobalAtom } from '@util/GlobalAtomContext';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

const TodoVertexPopUp = ({ id, x, y }: { id: string; x: number; y: number }): ReactElement => {
  const { todoList: todoListAtom } = useGlobalAtom();

  const [todoList, setTodoList] = useAtom(todoListAtom);
  const [from, to] = id.split('+');
  return (
    <PopUp x={x} y={y}>
      <Button
        context={<img src={Delete} width="40px" height="40px" />}
        onClick={() => {
          todoList
            .getTodoById(from)
            .then(async (prevTodo) => {
              if (prevTodo === undefined) throw new Error('ERROR: 선후관계 제거 중 찾는 Todo가 존재하지 않습니다.');
              const next = new Set(prevTodo.next);
              next.delete(to);
              return await todoList.edit(from, { next: [...next] });
            })
            .then((newTodoList) => {
              setTodoList(newTodoList);
              toast.success('Todo 선후관계가 성공적으로 삭제되었습니다.');
            })
            .catch((err) => toast.error(err));
        }}
      />
    </PopUp>
  );
};

export default memo(TodoVertexPopUp);
