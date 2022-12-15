import { getTodayDate } from './Common';
import { MAX_DATE } from './Constants';

export const validatePrevAndNextId = (uuidArray: string[]): boolean => {
  const regex = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
  if (uuidArray.length > 0) {
    uuidArray.forEach((uuid: string) => {
      if (!regex.test(uuid)) throw new Error('id가 올바르지 않게 입력되었습니다');
    });
  } else {
    return true;
  }
  return true;
};

export const uuidSeriesTextToUuidArray = (uuidSeriesText: string): string[] => {
  return uuidSeriesText
    .replaceAll('\n', '')
    .replaceAll(' ', '')
    .split(',')
    .filter((id: string) => id !== '');
};

export const validateCircularReference = (idList: string[], checkId: string): boolean => {
  return idList.some((id) => id === checkId);
};

export const validateUuid = (uuid: string): boolean => {
  const regex = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
  if (!regex.test(uuid)) throw new Error('먼저 할 일 또는 나중에 할 일의 id값이 올바르지 않습니다');
  return true;
};

interface ModalValues {
  id: string;
  value: string;
  dataset: { label: string; id: string };
}

const MODAL_CREATE = 'create';

interface CheckedInputData {
  newData: any;
  prev: string[];
  next: string[];
}
export const getCheckedInputData = (type: string, inputData: ModalValues[]): CheckedInputData => {
  let newData = {};
  const prevTodoIdList: string[] = [];
  const nextTodoIdList: string[] = [];

  inputData.forEach((item) => {
    const { id, value, dataset }: ModalValues = item;

    if (id === 'title' && value === '') {
      throw new Error('제목은 필수 값입니다!');
    }
    if (id === 'title' && value.match(/[.*+?^${}()|[\]\\]/) !== null) {
      throw new Error('제목은 ".*+?^${}()"의 특수문자가 허용되지 않습니다!');
    }
    if (id === 'until') {
      const newDate = new Date(value);
      if (isNaN(Number(newDate))) {
        throw new Error('유효하지 않은 날짜입니다!');
      }
      if (newDate > new Date(MAX_DATE)) {
        throw new Error('날짜는 2999-12-30 이후로 설정할 수 없습니다.');
      }
      if (type === MODAL_CREATE && newDate < new Date(getTodayDate())) {
        throw new Error('새로 생성하는 할 일은 과거로 설정 불가능합니다.');
      }
      return (newData = { ...newData, [id]: newDate });
    }

    if (dataset.label === 'prev' || dataset.label === 'next') {
      return dataset.label === 'prev' ? prevTodoIdList.push(dataset.id) : nextTodoIdList.push(dataset.id);
    }
    newData = { ...newData, [id]: value };
  });

  return { newData, prev: prevTodoIdList, next: nextTodoIdList };
};
