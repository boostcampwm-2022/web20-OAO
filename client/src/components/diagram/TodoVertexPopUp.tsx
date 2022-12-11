import { ReactElement, memo } from 'react';
import PopUp from '@components/diagram/PopUp';
import Button from '@components/Button';
import Delete from '@images/Delete.svg';

const TodoVertexPopUp = ({ x, y }: { x: number; y: number }): ReactElement => {
  return (
    <PopUp x={x} y={y}>
      <Button
        context={<img src={Delete} width="40px" height="40px" />}
        onClick={(e) => {
          console.log('delete');
        }}
      />
    </PopUp>
  );
};

export default memo(TodoVertexPopUp);
