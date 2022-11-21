export interface Todo {
  // (필수) 입력값 및 기본 데이터
  id: string; // UUIDv4, 할일의 고유 id
  title: string; // VARCHAR(255), 할일의 이름
  content: string; // TEXT, 할일의 상세 내용
  owner: string; // UUIDv4, 할일 소유자의 id
  importance: number; // INT or ENUM, 할일의 우선순위 레벨
  until: Date; // DATE, 할일의 마감기한
  from: Date; // DATE, 할일의 시작기한
  prev: Array<Todo>; // or Array<string>, 이전에 반드시 완료되어야 하는 할일 id 배열
  next: Array<Todo>; // or Array<string>, 본 할일 이후에 실행되어야 하는 할일 id 배열

  // (필수) 할일의 상태값
  isDone?: boolean; // 할일이 완료되었는지 여부
  isReady?: boolean; // 할일이 시행할 준비가 되었는지 여부 (from, isAllPrevDone 체크)

  isAllPrevDone?: boolean; // 선행해야하는 할일이 모두 완료되었는지 여부, prev를 Array<Todo>로 관리시 불필요

  // (선택) 메타데이터
  spentTime?: Date; // 총 할일 수행 시간, default = 0
  postponeCount?: number; // 총 미룬 횟수, default = 0
}

export interface RawData {
  // (필수) 입력값 및 기본 데이터
  title: string; // VARCHAR(255), 할일의 이름
  content: string; // TEXT, 할일의 상세 내용
  priority: number; // INT or ENUM, 할일의 우선순위 레벨
  until: string; // string, 할일의 마감기한
  from: string; // string, 할일의 시작기한
}

export const testFun = (num: number) => {
  return num + 1;
};
