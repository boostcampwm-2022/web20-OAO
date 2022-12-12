import { ReactElement, memo } from 'react';
import PopUp from '@components/diagram/PopUp';
import Button from '@components/Button';
import Update from '@images/Update.svg';
import Path from '@images/Path.svg';
import Delete from '@images/Delete.svg';
import { todoList as todoListAtom } from '@util/GlobalState';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import { NewVertexData } from '@container/diagram/Diagram';

const TodoBlockPopUp = ({
  id,
  x,
  y,
  targetPos,
  getOnNewVertexClick,
}: {
  id: string;
  x: number;
  y: number;
  targetPos: { x: number; y: number };
  getOnNewVertexClick: ({ from, x1, y1 }: NewVertexData) => (event: React.MouseEvent) => void;
}): ReactElement => {
  const [todoList, setTodoList] = useAtom(todoListAtom);
  const onClick = getOnNewVertexClick({ from: id, x1: targetPos.x, y1: targetPos.y, x2: NaN, y2: NaN });
  return (
    <PopUp x={x} y={y}>
      <Button
        context={<img src={Update} width="40px" height="40px" />}
        onClick={(e) => {
          console.log('update');
        }}
      />
      <Button context={<img src={Path} width="40px" height="40px" />} onClick={onClick} />
      <Button
        context={<img src={Delete} width="40px" height="40px" />}
        onClick={() => {
          todoList
            .remove(id)
            .then((newTodoList) => {
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
