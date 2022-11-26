import { memo, ReactElement } from 'react';
import styled from 'styled-components';

import { POSTPONE_TEXTS, PRIMARY_COLORS } from '../util/Constants';

import Text from './Text';
import Button from './Button';

const { red, white } = PRIMARY_COLORS;

const STYLED_POSTPONE_BOX = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${red};
  line-height: 25px;
  letter-spacing: 0em;
  align-items: flex-start;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 161px;
  height: 155px;
  padding: 20px;
  gap: 20px;
  position: absolute;
  left: 40px;
  top: 60px;
`;

const PostponeBox = (): ReactElement => {
  return (
    <STYLED_POSTPONE_BOX>
      {POSTPONE_TEXTS.map((text): ReactElement => {
        return (
          <Button
            key={text}
            context={<Text text={text} color={white} fontFamily={'Noto Sans'} fontSize={'18px'} fontWeight={'700'} />}
            onClick={() => {
              console.log(text);
            }}
          />
        );
      })}
    </STYLED_POSTPONE_BOX>
  );
};
export default memo(PostponeBox);
