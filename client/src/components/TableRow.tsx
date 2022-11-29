import { ReactElement, useState } from 'react';
import Button from '@components/Button';
import Image from '@components/Image';
import Unchecked from '@images/Unchecked.svg';
import Checked from '@images/Checked.svg';
import Delete from '@images/Delete.svg';
import Update from '@images/Update.svg';
import styled from 'styled-components';

const CheckWrapper = styled.div`
  input {
    display: none;
  }
  img {
    cursor: pointer;
  }
`;

const TitleWrapper = styled.div`
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ContentWrapper = styled.div`
  margin: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TableRow = (): ReactElement => {
  const [isTodoDone, setIsTodoDone] = useState(false);
  const checkHandler = (): void => {
    setIsTodoDone(!isTodoDone);
  };
  return (
    <>
      <CheckWrapper>
        <input type="checkBox" id="todoDone" readOnly={isTodoDone} onClick={checkHandler} />
        <label htmlFor="todoDone">{isTodoDone ? <Image src={Checked} /> : <Image src={Unchecked} />}</label>
      </CheckWrapper>
      <TitleWrapper style={{ textAlign: 'left' }}>
        제목이 이렇게 길 줄 몰랐죠? 제목이 이렇게 긴건 제목 안에 제목 또 제목
      </TitleWrapper>
      <div>작업 가능</div>
      <div>2022.12.14 11:30</div>
      <div>A</div>
      <ContentWrapper>컨텐츠 이렇게 길 줄 몰랐죠? 컨텐츠이 이렇게 긴건 컨텐츠 안에 컨텐츠 또 컨텐츠</ContentWrapper>
      <ContentWrapper>컨텐츠 이렇게 길 줄 몰랐죠? 컨텐츠이 이렇게 긴건 컨텐츠 안에 컨텐츠 또 컨텐츠</ContentWrapper>
      <div>
        <Button context={<img src={Update} />} />
        <Button context={<img src={Delete} />} />
      </div>
    </>
  );
};

export default TableRow;
