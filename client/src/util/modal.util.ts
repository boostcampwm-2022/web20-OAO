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
