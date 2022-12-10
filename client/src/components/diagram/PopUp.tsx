import { ReactElement, memo } from 'react';
import Button from '@components/Button';
import Update from '@images/Update.svg';
import Delete from '@images/Delete.svg';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';

const { lightGray } = PRIMARY_COLORS;

const Wrapper = styled.div`
  position: fixed;
  width: max-content;
  display: flex;
  padding: 5px;
  border-radius: 10px;
  background-color: ${lightGray};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  transform: translate(var(--x), var(--y));
`;

const PopUp = ({
  type,
  x,
  y,
  id,
}: {
  type: 'Todo' | 'Vertex' | 'None';
  x: number;
  y: number;
  id: string;
}): ReactElement => {
  const style = { '--x': `${x}px`, '--y': `${y}px` };
  return (
    <>
      {type !== 'None' && (
        <Wrapper style={style as React.CSSProperties}>
          {type === 'Todo' && (
            <Button
              context={<img src={Update} width="40px" height="40px" />}
              onClick={(e) => {
                console.log('update');
              }}
            />
          )}
          <Button
            context={<img src={Delete} width="40px" height="40px" />}
            onClick={(e) => {
              console.log('delete');
            }}
          />
        </Wrapper>
      )}
    </>
  );
};

export default memo(PopUp);
