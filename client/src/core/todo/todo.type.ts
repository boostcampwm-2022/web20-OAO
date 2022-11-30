export interface PlainTodo {
  id: string; // UUIDv4, 할일의 고유 id
  title: string; // VARCHAR(255), 할일의 이름
  content: string; // TEXT, 할일의 상세 내용
  owner: string; // UUIDv4, 할일 소유자의 id
  importance: number; // INT or ENUM, 할일의 우선순위 레벨
  until: Date; // DATE, 할일의 마감기한
  from: Date; // DATE, 할일의 시작기한
  prev: string[]; // or string[], 이전에 반드시 완료되어야 하는 할일 id 배열
  next: string[]; // or string[], 본 할일 이후에 실행되어야 하는 할일 id 배열
  elapsedTime: number;
  lastPostponed: Date;
  state: 'READY' | 'DONE' | 'WAIT';
}

export type InputTodo = Partial<Omit<PlainTodo, 'until' | 'from' | 'lastPostponed'>> & {
  until?: Date | string;
  from?: Date | string;
  lastPostponed?: Date | string;
};
